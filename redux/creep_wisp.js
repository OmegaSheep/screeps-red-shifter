module.exports = function Dog(creep) {

	var target = creep.pos.findNearest(Game.MY_CREEPS);
	var enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	var far = !creep.pos.inRangeTo(enemy, 3);

	if(far && creep.body[0].hits > 0) {
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
