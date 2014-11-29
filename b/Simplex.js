var _ = require("lodash")


/*
	Next attempt:
		Create repitoir of available actions:
			moveEnemy, moveSpawn, moveSource, moveEnergy, ...
			attack, attackRanged,
			harvest, build, etc..
			
			pick best.!

*/


var Types = {
	mole: {
		parts: [Game.MOVE, Game.WORK, Game.WORK, Game.WORK],
		act: function(mole){
			var energy = mole.pos.findNearest(Game.SOURCES)
			if (energy) { mole.moveTo(energy), mole.harvest(energy) } 
		}
	},
	rat: {
		parts: [Game.MOVE, Game.ATTACK, Game.CARRY, Game.MOVE],
		act: function(rat){
			var spawn = rat.pos.findNearest(Game.MY_SPAWNS)
			if (rat.energy < rat.energyCapacity && rat.hits == rat.hitsMax) {
				var energy = rat.pos.findNearest(Game.DROPPED_ENERGY)
				if (energy) { rat.moveTo(energy), rat.pickup(energy) }
				else if (spawn) { rat.moveTo(spawn) }
			} else { 			
				if (spawn) { rat.moveTo(spawn), rat.transferEnergy(spawn) } }
			var hostile = rat.pos.findNearest(Game.HOSTILE_CREEPS)
			if (hostile) { rat.attack(hostile) }
		}
	},
	dog: {
		parts: [Game.MOVE, Game.HEAL, Game.ATTACK, Game.MOVE],
		act: function(dog){
			var spawn = dog.pos.findNearest(Game.MY_SPAWNS)
			var hostile = dog.pos.findNearest(Game.HOSTILE_CREEPS)
			if (dog.hits <= dog.hitMax/2) {
				if (spawn) { dog.moveTo(spawn) } 
			}
			var injured = dog.pos.findNearest(Game.MY_CREEPS, { filter: function(ally) {
				return dog !== ally && ally.hits < ally.hitsMax } 
			})
			if (injured) { 
				dog.moveTo(injured); 
				dog.heal(injured);
			} else {
				if (hostile) { 
					if(dog.pos.inRangeTo(hostile, 3)){ dog.moveTo(hostile, {withinRampartsOnly: true}) } 
					else {
						var rat = dog.pos.findNearest(Game.MY_CREEPS, {filter: function(creep){ return creep.memory.type == "rat" }})
						if (rat) { dog.moveTo(rat) }
						else { dog.moveTo(spawn) }
					}
					dog.attack(hostile) 
				} else {
					var rat = dog.pos.findNearest(Game.MY_CREEPS, {filter: function(creep){ return creep.memory.type == "rat" }})
					if (rat) { dog.moveTo(rat) }
					else { dog.moveTo(spawn) }
				}
			}
		}
	},
	wolf: {
		parts: [Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.ATTACK],
		act: function(wolf){
			var hostile = wolf.pos.findNearest(Game.HOSTILE_CREEPS)
			if(hostile && wolf.pos.inRangeTo(hostile, 5)){
				wolf.moveTo(hostile, {withinRampartsOnly: true})
				wolf.attack(hostile)
			} else {
				var spawn = wolf.pos.findNearest(Game.MY_SPAWNS)
				if (!wolf.pos.inRangeTo(spawn, 3)){
					wolf.moveTo(spawn)
				}
			}
		}
	},
	wasp: {
		parts: [Game.MOVE, Game.RANGED_ATTACK, Game.RANGED_ATTACK],
		act: function(wasp){
			var spawn = wasp.pos.findNearest(Game.MY_SPAWNS)
			var hostile = wasp.pos.findNearest(Game.HOSTILE_CREEPS)
			if(hostile && wasp.pos.inRangeTo(hostile, 5)){
				if(!wasp.pos.inRangeTo(hostile, 2)){
					wasp.moveTo(hostile, {withinRampartsOnly: true})
				} else {
					wasp.moveTo(spawn)
				}
				wasp.rangedAttack(hostile)
			} else {
				if (!wasp.pos.inRangeTo(spawn, 2)){
					wasp.moveTo(spawn)
				}
			}
		}
	},
	beaver: {
		parts: [Game.CARRY, Game.MOVE, Game.CARRY, Game.WORK, Game.WORK],
		act: function(creep){
			var spawn = creep.pos.findNearest(Game.MY_SPAWNS)
			if(creep.energy == 0) {
				creep.moveTo(spawn);
				spawn.transferEnergy(creep);
			} else {
				var structures = creep.room.find(Game.STRUCTURES);
				var damagedRamparts = [ ];
				for(var index in structures){ var structure = structures[index];
					if(structure.structureType == 'rampart' && structure.hits < (structure.hitsMax - 20)){
						damagedRamparts.push(structure);
					}
				}
				damagedRamparts.sort(function(a, b){ return(a.hits - b.hits) });
				if(damagedRamparts.length){
					creep.moveTo(damagedRamparts[0], { withinRampartsOnly: true });
					creep.repair(damagedRamparts[0]);
					return;
				}

				var halfBroken = creep.room.find(Game.STRUCTURES);
				var toRepair = [ ];
				for(var index in halfBroken){
					if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5){
						toRepair.push(halfBroken[index]);
					}
				}
				if(toRepair.length){
					var structure = toRepair[0];
					creep.moveTo(structure, { withinRampartsOnly: true });
					creep.repair(structure);
					return;
				}
				var targets = creep.room.find(Game.CONSTRUCTION_SITES);
				if(targets.length) {
					creep.moveTo(targets[0], { withinRampartsOnly: true });
					creep.build(targets[0]);
					return;
				}
				creep.moveTo(spawn, { withinRampartsOnly: true });
			}
		}
	}
}

_.forEach(Types, function(type){ 
	type.alive = []
	type.want = 0
})

_.forEach(Game.creeps, function(creep){ if(creep.my){
	var type = Types[creep.memory.type]
	type.alive.push(creep)
	type.act(creep)
}})

var queue = ["mole", "rat", "dog", "wasp", "wasp", "rat", "beaver", "wolf", "wasp", "wasp", "wolf", "dog"];

(function(){
	for (var type in queue){ var name = queue[type]; type = Types[name] 
		if (++type.want > type.alive.length){
			(function(){
				for(var spawn in Game.spawns){ spawn = Game.spawns[spawn]
					if (spawn.my && !spawn.spawning && energyCost(type.parts) < spawn.energy){
						var creep = spawn.createCreep(type.parts, void 0, {type: name})
						if (!(creep < 0)){ return; }
					}
				}
			})()
			return;
		}
	}
})()


function energyCost(parts){
	return _.reduce(parts, function(total, part){ switch (part) {
			case Game.MOVE:          return total + 50
			case Game.WORK:          return total + 20
			case Game.CARRY:         return total + 50
			case Game.ATTACK:        return total + 100
			case Game.RANGED_ATTACK: return total + 150
			case Game.HEAL:          return total + 200
			case Game.TOUGH:         return total + 5
	} }, 0)
}
