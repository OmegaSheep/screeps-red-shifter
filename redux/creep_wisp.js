module.exports = function Wisp(creep) {

	var target = creep.pos.findNearest(Game.MY_CREEPS, {filter: function(creep) { return creep.hits < creep.hitsMax } } );
	var enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	//ar far = !creep.pos.inRangeTo(enemy, 3);

	if(creep.hits > 50) {
		creep.moveTo(target);
		creep.heal(target);
	} else {
		var spawn = creep.pos.findNearest(Game.MY_SPAWNS)
		creep.heal(target);
		creep.moveTo(spawn);
	}
};

module.exports.parts = [Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE];

module.exports.role = "heal";
