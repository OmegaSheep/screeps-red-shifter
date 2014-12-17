//Attack and kite
module.exports = function Wasp(creep) {
	//Behaviour
	var spawn = creep.pos.findNearest(Game.MY_SPAWNS)
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS)
	var near = creep.pos.isNearTo(target, 2)
	if(near){
		creep.moveTo(spawn)
	} else {
		creep.moveTo(target)
	}
	creep.rangedAttack(target);
	
};

module.exports.parts = [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE]

module.exports.role = "guard"
