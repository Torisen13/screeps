var roleUpgrader = require('role.upgrader');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep)
    {

        if(creep.memory.depositing && creep.carry.energy == 0)
        {
            creep.memory.depositing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.depositing && creep.carry.energy == creep.carryCapacity)
        {
	        creep.memory.depositing = true;
	        creep.say('⚡ deposit');
	    }

	    if(creep.memory.depositing)
        {
            var targets = creep.room.find(FIND_STRUCTURES,
                {
                    filter: (structure) =>
                    {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleHarvester;
