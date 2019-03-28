var roleBuilder = require('role.builder');

var roleWallRepairer = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
	    if(creep.memory.repairing && creep.carry.energy == 0)
        {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity)
        {
	        creep.memory.repairing = true;
	        creep.say('🚧 repairing wall');
	    }

	    if(creep.memory.repairing)
        {
	        var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL});
            var target = undefined;

            for(let percentage = 0.00001; percentage<=1; percentage = percentage +0.00001)
            {
                for(let wall of walls)
                {
                    if(wall.hits / wall.hitsMax < percentage)
                    {
                        target = wall;
                        break;
                    }
                }
                if(target != undefined)
                {
                    break;
                }
            }

            if(target != undefined)
            {
                if(creep.repair(target) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                roleBuilder.run(creep);
            }
	    }
	    else
        {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleWallRepairer;
