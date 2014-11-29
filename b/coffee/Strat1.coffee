_ = require "lodash"


roles = {

	miner: {
		parts: [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY],
		creeps: []
		fn: (miner) ->
			source = miner.room.find(Game.SOURCES)[0]
			miner.moveTo(source)
			miner.harvest(source)
			_.forEach roles.collector.creeps, (collector) -> 
				if miner.pos.isNearTo(collector)
					miner.transferEnergy(collector)
	},
	
	collector: {
		parts: [Game.MOVE, Game.CARRY],
		creeps: [],
		fn: (collector) ->
			if collector.energy < collector.energyCapacity
				miner = _.first(_.shuffle(roles.miner.creeps))
				collector.moveTo(miner)
			else
				collector.moveTo(Game.spawns.Spawn1)
				collector.transferEnergy(Game.spawns.Spawn1)
	},
	
	tank: {
		parts: [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK],
		creeps: [],
		fn: (tank) ->
			_.forEach tank.room.find(Game.ENEMY_CREEPS), (enemy) ->
				if tank.pos.inRangeTo(enemy.pos, 3)
					tank.rangedAttack(enemy)
				if Game.flags[tank.name]
					tank.moveTo(Game.flags[tank.name])
	},
	
	tech: {
		parts: [Game.MOVE, Game.HEAL],
		creeps: [],
		fn: (tech) -> 
			myCreeps = creep.room.find(Game.MY_CREEPS);
			target = _.reduce(myCreeps, ((target, creep) ->
				if ((creep.hitsMax - creep.hits) > (target.hitsMax - target.hits)) 
					return creep 
				else return target
			), myCreeps.pop())
			if target?
				tech.moveTo(target)
				tech.heal(target)
			else 
				tech.moveTo(Game.spawns.Spawn1)
	},
	
	scavanger: {
		parts: [Game.MOVE, Game.CARRY, Game.MOVE],
		creeps: [],
		fn: (scavanger) ->
			drops = scavanger.room.find(Game.DROPPED_ENERGY);
			if drops[0]? and scavanger.energy < scavanger.energyCapacity
				scavanger.moveTo(drops[0])
				scavanger.pickup(drops[0])
			else
				scavanger.moveTo(Game.spawns.Spawn1);
				scavanger.transferEnergy(Game.spawns.Spawn1)
	}

}


unless Memory.queue?.length
	Memory.queue = ["miner", "collector", "tank", "tech", "scavanger"]

if not Game.spawns.Spawn1.spawning
	next = Memory.queue[0]
	spawn = Game.spawns.Spawn1.createCreep(roles[next].parts, undefined, {role: next})
	if typeof spawn is 'string'
		Memory.queue = Memory.queue.slice(1)


_.forEach Game.creeps, (creep) ->
	if creep.my
		roles[creep.memory.role].creeps.push(creep)

_.forEach roles, (role) ->
	_.forEach role.creeps, (creep) ->
		role.fn(creep)

