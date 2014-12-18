module.exports = function Wisp(creep) {

	var target = creep.pos.findNearest(Game.MY_CREEPS, {filter: function(creep) { return creep.hits < creep.hitsMax } } );
	var enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(enemy){
		var far = !creep.pos.inRangeTo(enemy, 3);
	} else {
		var far = true;
	}

	if(far && creep.body[1].hits > 0) {
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
