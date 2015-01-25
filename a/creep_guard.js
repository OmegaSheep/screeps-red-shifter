module.exports = function(creep) {
    var targets = creep.room.find(Game.HOSTILE_CREEPS);
    if (targets.length) {
        if (creep.body[3].hits > 0) {
            var dx = Math.abs(targets[0].pos.x - Game.flags.Flag1.pos.x);
            var dy = Math.abs(targets[0].pos.y - Game.flags.Flag1.pos.y);
            var dist = Math.sqrt(dx*dx+dy*dy);
            if (dist <= 10) {
                creep.moveTo(targets[0]);
                creep.attack(targets[0]);
            }
            else {
                creep.moveTo(Game.flags.Flag1);
            }
        }
        else {
            creep.moveTo(Game.flags.Flag1);
        }
    }
    else {
        creep.moveTo(Game.flags.Flag1);
    }
};