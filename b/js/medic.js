var _ = require("lodash")

module.exports = function(creep){
	var target = _.reduce(creep.room.find(Game.MY_CREEPS), function(target, creep){
		if (!target) return creep;
		else if (creep.maxHits - creep.hits > target.maxHits - creep.hits) return creep;
		else return target
	})

	if(target){
		creep.moveTo(target);
		creep.heal(target);
	}
}

