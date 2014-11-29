// harvest nearest source
module.exports = function(creep) {
    if (creep.energy < creep.energyCapacity) {
        var source_get_nearest = require('source_get_nearest');
        var source = source_get_nearest(creep);

        var dx = Math.abs(source.pos.x - creep.pos.x);
        var dy = Math.abs(source.pos.y - creep.pos.y);
        var dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 15) {
            creep.moveTo(source);
            creep.harvest(source);
        }
    }
    else {
        creep.moveTo(Game.spawns.Spawn1);
	    creep.transferEnergy(Game.spawns.Spawn1);
    }
};