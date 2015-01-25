// harvest nearest source
module.exports = function(creep) {
    if (creep.energy < creep.energyCapacity) {
        var locate_harvester = require('closest_friend');
        var goal = locate_harvester(creep,"harvester");
        
        if (goal === undefined) {
           throw new Error("Carrier could not find goal.");
        }
        creep.moveTo(goal);
    }
    else {
        creep.moveTo(Game.spawns.Spawn1);
	    creep.transferEnergy(Game.spawns.Spawn1);
    }
};