module.exports = function(creep) {
    var targets = creep.room.find(Game.MY_CREEPS);
    for(var i in targets) {
        if ( (targets[i].hits < targets[i].hitsMax) && (targets[i].memory.role == "guard" || targets[i].memory.role == "ranged") ) {
            creep.moveTo(targets[i]);
        	creep.heal(targets[i]);
        }
        else {
            creep.moveTo(Game.flags.Flag1);
        }
    }

};