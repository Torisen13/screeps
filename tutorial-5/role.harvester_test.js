var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//TODO: Find most direct path -> drop roads spawn to sources controler to sources extensions etc.
//
//screep will calc most direct route -> store path im memory and use that to
//navigate insted of recalculating every move
//
//make repairer
//
//build walls at exits
//
//Container/drop mining


var roleHarvester_test = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        //creep.say("Fatigue: " + creep.fatigue);

        if(creep.fatigue === 0)
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
                }
                else
                {
                    roleBuilder.run(creep);
                }
            }
            else {
                /*var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[3]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[3], {visualizePathStyle: {stroke: '#ffaa00'}});
                }*/
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else
        {
            //var err = creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
        }
	}
};

module.exports = roleHarvester_test;
