var creep_harvest = require('creep_harvest');
var creep_build = require('creep_build');
var creep_guard = require('creep_guard');
var creep_healer = require('creep_healer');
var creep_ranged = require('creep_ranged');
var creep_carry = require('creep_carry');
var build_update = require('build_order');
var _ = require('lodash');

console.log("Current Resources:", Game.spawns.Spawn1.energy);

if (!Game.spawns.Spawn1.memory.buildOrder) {
    Game.spawns.Spawn1.memory.buildOrder = [];
}
Game.spawns.Spawn1.memory.buildOrder = build_update(Game.spawns.Spawn1.memory.buildOrder);

for (var i in Game.creeps) {
    var creep = Game.creeps[i];

    if (creep.memory.role == 'harvester') {
        creep_harvest(creep);
    }
    if (creep.memory.role == 'builder') {
        creep_build(creep);
    }
    if (creep.memory.role == 'guard') {
        creep_guard(creep);
    }
    if (creep.memory.role == 'healer') {
        creep_healer(creep);
    }
    if (creep.memory.role == 'ranged') {
        creep_ranged(creep);
    }
    if (creep.memory.role == 'carry') {
        creep_carry(creep);
    }
}

if (Game.spawns.Spawn1.spawning === null && Game.spawns.Spawn1.energy > Game.spawns.spawn1.memory.buildOrder.) {
    switch(Game.spawns.Spawn1.memory.buildOrder.shift()) {
        case 'h':
            Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], null, {role: 'harvester'});
            break;
        case 'g':
            Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE], null, {role: 'guard'});
            break;
        case 'p':
            Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.HEAL, Game.MOVE], null, {role: 'healer'});
            break;
        case 'r':
            Game.spawns.Spawn1.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE], null, {role: 'ranged'});
            break;
        case 'b':
            Game.spawns.Spawn1.createCreep([Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], null, {role: 'builder'});
            break;
        case 'c':
            Game.spawns.Spawn1.createCreep([Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], null, {role: 'carry'});
            break;
        default:
            break;
    }
}