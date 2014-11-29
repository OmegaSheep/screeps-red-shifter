var creep_harvest = require('creep_harvest');
var creep_build = require('creep_build');
var creep_guard = require('creep_guard');

var h_count = 0;
var b_count = 0;
var g_count = 0;

for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    
    if (creep.memory.role === 'harvester') {
        h_count += 1;
        creep_harvest(creep);
    }
    if (creep.memory.role === 'builder') {
	b_count += 1;
        creep_build(creep);
    }
    if (creep.memory.role == 'guard') {
	g_count += 1;
    	creep_guard(creep);
    }
}

if (h_count < 3) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, {role: 'harvester'});
}
if (h_count == 3 && b_count < 2) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE], null, {role: 'builder'});	
}