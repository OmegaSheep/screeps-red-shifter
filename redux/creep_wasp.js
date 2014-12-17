//Attack and kite
module.exports = function Wasp(creep) {
	//Behaviour
	var spawn = creep.pos.findNearest(Game.MY_SPAWNS)
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS)
	if(target){
		var near = creep.pos.inRangeTo(target, 3)
		if(near){
			creep.moveTo(spawn)
		} else {
			creep.moveTo(target)
		}
		creep.rangedAttack(target);
	} else {
		creep.moveTo(spawn)
	}
};

module.exports.parts = [Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE]

module.exports.role = "guard"
