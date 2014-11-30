// Generated by CoffeeScript 1.8.0
(function() {
  var next, roles, spawn, _, _ref;

  _ = require("lodash");

  roles = {
    miner: {
      parts: [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY],
      creeps: [],
      fn: function(miner) {
        var source;
        source = miner.room.find(Game.SOURCES)[0];
        miner.moveTo(source);
        miner.harvest(source);
        return _.forEach(roles.collector.creeps, function(collector) {
          if (miner.pos.isNearTo(collector)) {
            return miner.transferEnergy(collector);
          }
        });
      }
    },
    collector: {
      parts: [Game.MOVE, Game.CARRY],
      creeps: [],
      fn: function(collector) {
        var miner;
        if (collector.energy < collector.energyCapacity) {
          miner = _.first(_.shuffle(roles.miner.creeps));
          return collector.moveTo(miner);
        } else {
          collector.moveTo(Game.spawns.Spawn1);
          return collector.transferEnergy(Game.spawns.Spawn1);
        }
      }
    },
    tank: {
      parts: [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK],
      creeps: [],
      fn: function(tank) {
        return _.forEach(tank.room.find(Game.ENEMY_CREEPS), function(enemy) {
          if (tank.pos.inRangeTo(enemy.pos, 3)) {
            tank.rangedAttack(enemy);
          }
          if (Game.flags[tank.name]) {
            return tank.moveTo(Game.flags[tank.name]);
          }
        });
      }
    },
    tech: {
      parts: [Game.MOVE, Game.HEAL],
      creeps: [],
      fn: function(tech) {
        var myCreeps, target;
        myCreeps = creep.room.find(Game.MY_CREEPS);
        target = _.reduce(myCreeps, (function(target, creep) {
          if ((creep.hitsMax - creep.hits) > (target.hitsMax - target.hits)) {
            return creep;
          } else {
            return target;
          }
        }), myCreeps.pop());
        if (target != null) {
          tech.moveTo(target);
          return tech.heal(target);
        } else {
          return tech.moveTo(Game.spawns.Spawn1);
        }
      }
    },
    scavanger: {
      parts: [Game.MOVE, Game.CARRY, Game.MOVE],
      creeps: [],
      fn: function(scavanger) {
        var drops;
        drops = scavanger.room.find(Game.DROPPED_ENERGY);
        if ((drops[0] != null) && scavanger.energy < scavanger.energyCapacity) {
          scavanger.moveTo(drops[0]);
          return scavanger.pickup(drops[0]);
        } else {
          scavanger.moveTo(Game.spawns.Spawn1);
          return scavanger.transferEnergy(Game.spawns.Spawn1);
        }
      }
    }
  };

  if (!((_ref = Memory.queue) != null ? _ref.length : void 0)) {
    Memory.queue = ["miner", "collector", "tank", "tech", "scavanger"];
  }

  if (!Game.spawns.Spawn1.spawning) {
    next = Memory.queue[0];
    spawn = Game.spawns.Spawn1.createCreep(roles[next].parts, void 0, {
      role: next
    });
    if (typeof spawn === 'string') {
      Memory.queue = Memory.queue.slice(1);
    }
  }

  _.forEach(Game.creeps, function(creep) {
    if (creep.my) {
      return roles[creep.memory.role].creeps.push(creep);
    }
  });

  _.forEach(roles, function(role) {
    return _.forEach(role.creeps, function(creep) {
      return role.fn(creep);
    });
  });

}).call(this);