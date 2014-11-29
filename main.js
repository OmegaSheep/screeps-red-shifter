var creep_harvest = require('creep_harvest');
var creep_build = require('creep_build');
var creep_guard = require('creep_guard');
var creep_healer = require('creep_healer');

var h_count = 0;
var b_count = 0;
var g_count = 0;
var c_count = 0;

var h_want = 3;
var b_want = 1;
var g_want = 3;
var c_want = 2;

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
    if (creep.memory.role == 'healer') {
	    c_count += 1;
    	creep_healer(creep);
    }
}

if (h_count < h_want) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, {role: 'harvester'});
}
if (h_count >= h_want && g_count < g_want) {
    Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE], null, {role: 'guard'})
}
if  (h_count >= h_want && g_count >= g_want && c_count < c_want && b_count >= b_want) {
    Game.spawns.Spawn1.createCreep([Game.HEAL, Game.MOVE], null, {role: 'healer'})
}
if (h_count >= h_want && b_count < b_want && g_count >= g_want) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.CARRY, Game.CARRY, Game.MOVE], null, {role: 'builder'});	
}