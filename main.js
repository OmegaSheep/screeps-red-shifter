var creep_harvest = require('creep_harvest');
var creep_build = require('creep_build');
var creep_guard = require('creep_guard');

for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    
    if (creep.memory.role === 'harvester') {
        creep_harvest(creep);
    }
    if (creep.memory.role === 'builder') {
        creep_build(creep);
    }
    if (creep.memory.role == 'guard') {
    	creep_guard(creep);
    }
}