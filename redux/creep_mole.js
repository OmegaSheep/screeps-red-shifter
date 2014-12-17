//harvest nearest source
module.exports = function Mole(creep) {

        //Behaviour
        var source = creep.room.findNearest(Game.SOURCES);
        creep.moveTo(source);
        creep.harvest(source);
};

module.exports.parts = [Game.TOUGH, Game.WORK, Game.WORK, Game.WORK, Game.MOVE];

module.exports.role = "miner";