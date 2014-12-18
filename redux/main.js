var _ = require("lodash")

var Types = {
	Mole: require("creep_mole"),
	Badger: require("creep_badger"),
	Dog: require("creep_dog"),
	Wasp: require("creep_wasp"),
	Wisp: require("creep_wisp")
}





_.forEach(Types, function(type){ 
	type.alive = []
	type.want = 0
})

_.forEach(Game.creeps, function(creep){ if(creep.my && creep.ticksToLive > 75){
	var type = Types[creep.memory.type]
	type.alive.push(creep)
	type(creep)
}})

var queue = ["Mole", "Badger", "Dog", "Dog", "Wasp", "Dog", "Wasp", "Wisp", "Wisp", "Dog", "Dog", "Wasp", "Dog", "Wasp", "Wisp", "Wisp","Dog", "Dog", "Wasp", "Dog", "Wasp", "Wisp", "Wisp"];

(function(){
	for (var type in queue){ var name = queue[type]; type = Types[name] 
		if (++type.want > type.alive.length){
			(function(){
				for(var spawn in Game.spawns){ spawn = Game.spawns[spawn]
					if (spawn.my && !spawn.spawning && energyCost(type.parts) < spawn.energy){
						var creep = spawn.createCreep(type.parts, void 0, {role: type.role, type: type.name})
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
