module.exports = function(array) {

	var h_count = 0;
	var b_count = 0;
	var g_count = 0;
	var c_count = 0;
	var r_count = 0;

	var h_want = 3;
	var b_want = 0;
	var g_want = 1;
	var c_want = 1;
	var r_want = 2;

	for (var i in Game.creeps) {
	    var creep = Game.creeps[i];

	    if (creep.memory.role == 'harvester') {
	        h_count += 1;
	    }
	    if (creep.memory.role == 'builder') {
		    b_count += 1;
	    }
	    if (creep.memory.role == 'guard') {
		    g_count += 1;
	    }
	    if (creep.memory.role == 'healer') {
		    c_count += 1;
	    }
	    if (creep.memory.role == 'ranged') {
		    r_count += 1;
	    }
	}

	for (var j in Game.spawns.Spawn1.memory.buildOrder) {
	    var thing = Game.spawns.Spawn1.memory.buildOrder[j];

	    if (thing == 'h') {
	        h_count += 1;
	    }
	    if (thing == 'b') {
		    b_count += 1;
	    }
	    if (thing == 'g') {
		    g_count += 1;
	    }
	    if (thing == 'c') {
		    c_count += 1;
	    }
	    if (thing == 'r') {
		    r_count += 1;
	    }
	}

	var hasH = (h_count >= h_want);
	var hasG = (g_count >= g_want);
	var hasB = (b_count >= b_want);
	var hasC = (c_count >= c_want);
	var hasR = (r_count >= r_want);

	if (!hasH) {
	    array.push("h");
	}
	if  (hasH && hasG && !hasC) {
	    array.push("c");
	}
	if (hasH && !hasG) {
	    array.push("g");
	}
	if (hasC && !hasR) {
	    array.push("r");
	}
	if (!hasB) {
		array.push("b");
	}
	return array;
}
