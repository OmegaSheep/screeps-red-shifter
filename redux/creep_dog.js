//harvest nearest source
module.exports = function Dog(creep) {

	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if (creep.body[3].hits > 0) {
		creep.moveTo(target);
		creep.attack(target);
	} else {
		var spawn = creep.pos.findNearest(Game.MY_SPAWNS)
		creep.attack(target);
		creep.moveTo(spawn);
	}
};

module.exports.parts = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.MOVE];

module.exports.role = "guard";
