// harvest nearest source
module.exports = function(creep) {
    if (creep.energy < creep.energyCapacity) {

        var goal = creep.pos.findNearest(Game.MY_CREEPS, {filter: function(creep) {return creep.memory.role == 'miner'} });
        
        if (goal === undefined) {
           console.log(creep.name, ": Carrier could not find goal.");
        }
        creep.moveTo(goal);
        var energy = creep.pos.findNearest(Game.DROPPED_ENERGY);
        creep.pickup(energy);
    }
    else {
        var spawn creep.pos.findNearest(Game.MY_SPAWNS)
        creep.moveTo(spawn);
	    creep.transferEnergy(spawn);
    }
};

module.exports.parts = [Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE];

module.exports.role = "courier";