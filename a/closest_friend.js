// get nearest creep of role
module.exports = function(creep, roleX) {
    var min = 999999;
    var friend;
    var dx;
    var dy;
    var dist;
    var search;
    
    for (var i in Game.creeps) {
        search = Game.creeps[i];

        dx = Math.abs(search.pos.x - creep.pos.x);
        dy = Math.abs(search.pos.y - creep.pos.y);
        dist = Math.sqrt(dx*dx+dy*dy);
        
        if (search.memory.role == roleX && dist < min) {
            min = dist;
            friend = search;
        }
    }
    return friend;
};