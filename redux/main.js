var _ = require("lodash")

var Types = {
	mole: require("creep_mole"),
	badger: require("creep_badger")
}





_.forEach(Types, function(type){ 
	type.alive = []
	type.want = 0
})

_.forEach(Game.creeps, function(creep){ if(creep.my){
	var type = Types[creep.memory.role]
	type.alive.push(creep)
	type(creep)
}})

var queue = ["mole", "badger"];

(function(){
	for (var type in queue){ var name = queue[type]; type = Types[name] 
		if (++type.want > type.alive.length){
			(function(){
				for(var spawn in Game.spawns){ spawn = Game.spawns[spawn]
					if (spawn.my && !spawn.spawning && energyCost(type.parts) < spawn.energy){
						var creep = spawn.createCreep(type.parts, void 0, {type: name})
						if (!(creep < 0)){ return; }
					}
				}
			})()
			return;
		}
	}
})()


function energyCost(parts){
	return _.reduce(parts, function(total, part){ switch (part) {
			case Game.MOVE:          return total + 50
			case Game.WORK:          return total + 20
			case Game.CARRY:         return total + 50
			case Game.ATTACK:        return total + 100
			case Game.RANGED_ATTACK: return total + 150
			case Game.HEAL:          return total + 200
			case Game.TOUGH:         return total + 5
	} }, 0)
}
