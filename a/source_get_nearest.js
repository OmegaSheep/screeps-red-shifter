// get nearest source that still has energy
module.exports = function(creep) {
    var sources = creep.room.find(Game.SOURCES);
    var nearestSource = null;
    for (var i in sources) {
        var source = sources[i];
        if (source.energy === 0) {
            continue;
        }
        var dx = Math.abs(source.pos.x - creep.pos.x);
        var dy = Math.abs(source.pos.y - creep.pos.y);
        source.distance = Math.sqrt(dx*dx+dy*dy);
        
        if (nearestSource === null || nearestSource.distance > source.distance) {
            nearestSource = source;
        }
    }
    
    return nearestSource;
};