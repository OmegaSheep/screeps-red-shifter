var _ = require("lodash")

module.exports = {
	creeps: [],
	parts: ["move", "heal", "heal", "heal",  "move"],
	fn: function(creep){
		var myCreeps = creep.room.find(Game.MY_CREEPS);
		var target = _.reduce(myCreeps, function(target, creep){
			return ((creep.hitsMax - creep.hits) > (target.hitsMax - target.hits)) ? creep : target;
		}, myCreeps.pop())
		console.log(target, target.hits)
		if(target){
			creep.moveTo(target);
			creep.heal(target);
		}
	}
}

