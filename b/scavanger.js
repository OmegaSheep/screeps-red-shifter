module.exports = {
	creeps: [], 
	parts:   ["carry", "move"],
	fn: function (creep) {
		var energys = creep.room.find(Game.DROPPED_ENERGY);
		if(energys[0] && creep.energy < creep.energyCapacity) {
			creep.moveTo(energys[0]);
			creep.pickup(energys[0]);
		} else {
			creep.moveTo(Game.spawns.Spawn1);
			creep.transferEnergy(Game.spawns.Spawn1)
		}
	}
}
