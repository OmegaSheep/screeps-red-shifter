var _ = require('lodash');

var MIN_SPAWN_ENERGY = 100;
var MIN_HARVESTERS = 2;

var RATIO_GUARD_HARVESTER = 3/2;
var RATIO_MEDIC_HARVESTER = 1/3;
var RATIO_BUILDER_HARVESTER = 1/4;



// Load up the creeps 'personality types'
var roles = {

	harvester: {creeps: [], fn: require('harvester'), 
		parts:   ["work", "carry", "move"] },
	
	medic:     {creeps: [], fn: require('medic'),
		parts:   ["tough", "move", "heal",  "move"] },
		
	builder:   {creeps: [], fn: require('builder'), 
		parts:   ["work", "work", "carry", "move"] },
		
	guard:     {creeps: [], fn: require('guard'),
		parts:   ["tough", "move", "move", "attack"] }
		
}

// Assign roles
_.each(Game.creeps, function(creep){
	roles[creep.memory.role].creeps.push(creep)
})



// Construction logix
_.each(Game.spawns, function(spawn){
	if (!spawn.spawning && spawn.energy > MIN_SPAWN_ENERGY){
		if(roles.harvester.creeps.length < MIN_HARVESTERS){
			createCreep(spawn, "harvester")
		} else if (roleRatio('guard', 'harvester', RATIO_GUARD_HARVESTER)){
			createCreep(spawn, "guard")
		} else if (roleRatio('medic', 'harvester', RATIO_MEDIC_HARVESTER)){
			createCreep(spawn, "medic")			
		} else if (roleRatio('builder', 'harvester', RATIO_BUILDER_HARVESTER)){
			createCreep(spawn, "builder")
		} else {
			createCreep(spawn, "harvester")
		}
	}
})


// Apply roles
_.each(roles, function(role){
	_.each(role.creeps, function(creep){ 
		role.fn(creep)
	})
})







function createCreep(spawn, role){
	var creepName = spawn.createCreep(roles[role].parts)
	if (typeof creepName == 'string'){
		Memory.creeps[creepName].role = role
	}
}

function roleRatio(role1, role2, ratio){
	var r1 = roles[role1].creeps.length;
	var r2 = roles[role2].creeps.length;
	if (r2 == 0) return true;
	else return (r1/r2 < ratio);
}

