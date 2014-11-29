var _ = require("lodash")

var level = 1

var MinSpawnEnergy = 100

Memory.level = Memory.level || 1

var C = Creep
Creep.Leg = Game.MOVE
Creep.Arm = Game.WORK
Creep.Paw = Game.HEAL
Creep.Tail = Game.RANGED_ATTACK
Creep.Mouth = Game.CARRY
Creep.Teeth = Game.ATTACK
Creep.Armour = Game.TOUGH
function Creep(spawn, kind, memory){ 
	var memory = memory || {}
	memory.kind = kind.name
	return spawn.createCreep(kind.parts, void 0, memory); 
}



Mole.parts = [C.Armour, C.Leg, C.Arm, C.Arm, C.Arm]
Mole.spawn = function(spawn){ Creep(spawn, Mole) }
function Mole(mole){
	var energy = mole.pos.findNearest(Game.SOURCES)
	if (energy) { mole.moveTo(energy), mole.harvest(energy) } }

Squirrel.parts = [C.Leg, C.Leg, C.Tail, C.Mouth]
Squirrel.spawn = function(spawn){ Creep(spawn, Squirrel) }
function Squirrel(squirrel){
	if (squirrel.energy < squirrel.energyCapacity && squirrel.hits == squirrel.hitsMax) {
		var energy = squirrel.pos.findNearest(Game.DROPPED_ENERGY)
		if (energy) { squirrel.moveTo(energy), squirrel.pickup(energy) } } 
	else { 
		var spawn = squirrel.pos.findNearest(Game.MY_SPAWNS)
		if (spawn) { squirrel.moveTo(spawn), squirrel.transferEnergy(spawn) } }
	var hostile = squirrel.pos.findNearest(Game.HOSTILE_CREEPS)
	if (hostile) { squirrel.rangedAttack(hostile) } }

Dog.parts = [C.Paw, C.Leg, C.Leg, C.Teeth]
Dog.spawn = function(spawn){ Creep(spawn, Dog) }
function Dog(dog){
	var spawn = dog.pos.findNearest(Game.MY_SPAWNS)
	if (dog.hits <= dog.hitMax/2) {
		if (spawn) { dog.moveTo(spawn) } } 
	else {
		var injured = dog.pos.findNearest(Game.MY_CREEPS, { filter: function(ally) {
			return ally.hits < ally.hitsMax } } )
		if (injured) { dog.moveTo(injured) }
		else {
			var squirrel = dog.pos.findNearest(Game.MY_CREEPS, {filter: function(creep){ return creep.memory.kind == "Squirrel" }})
			if (squirrel) { dog.moveTo(squirrel) } } }
	var hostile = dog.pos.findNearest(Game.HOSTILE_CREEPS)
	if (hostile) { dog.attack(hostile) }
	if (injured) { dog.heal(injured) } }





have.has = _.reduce(Game.creeps, function(has, creep){
	if (creep.my) { 
		var kind = creep.memory.kind; 
		has[kind] = has[kind] ? has[kind] + 1 : 1 }
	return has }, {})
have.want = {}
have.kinds = []
function have(kinds){
	kinds.forEach(function(kind){ 
		have.want[kind.name] = have.want[kind.name] ? have.want[kind.name] + 1 : 1
		if (have.kinds.indexOf(kind) == -1){ have.kinds.push(kind); have.kinds[kind.name] = kind } })
	for(var spawn in Game.spawns){ spawn = Game.spawns[spawn]
		if (!spawn.spawning && spawn.energy > MinSpawnEnergy){
			for (var kind in kinds) { kind = kinds[kind]
				have.has[kind.name] = have.has[kind.name] || 0
				have.want[kind.name] = have.want[kind.name] || 0
				if (have.has[kind.name] < have.want[kind.name]) {
					var name = Creep(spawn, kind)
					if(!(name < 0)) { break } } } } } }


switch(Memory.level){
	case 2: have([Dog, Squirrel])
	case 1: have([Mole, Squirrel, Dog])
}

if(!_.any(have.want, function(want, kind){ have.has[kind] < want })){
	Memory.level = Memory.level + 1
}


_.forEach(Game.creeps, function(creep){
	if (creep.my) { have.kinds[creep.memory.kind](creep) }
})




