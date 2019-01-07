var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester_test = require('role.harvester_test');
var roleWallRepairer = require('role.wallrepair');

var roomlvl3 = {

    /** @param {Creep} creep **/
    control: function(spawn)
    {

        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
        for(let tower of towers)
        {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            /*var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }*/
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var test = _.filter(Game.creeps, (creep) => creep.memory.role == 'test');
        var wallRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');

        if(test.length < 0)
        {
            var newName = 'Test' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'test'}});
        }

        if(wallRepairer.length < 2)
        {
            var newName = 'WallRepairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'wallRepairer'}});
        }

        if(builders.length < 1)
            {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
            }

        if(upgraders.length < 2)
            {
                var newName = 'Upgrader' + Game.time;
                //console.log('Spawning new upgrader: ' + newName);
                Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName,
                    {memory: {role: 'upgrader'}});
            }

        if(harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'test') {
                roleHarvester_test.run(creep);
            }
            if(creep.memory.role == 'wallRepairer') {
                roleWallRepairer.run(creep);
            }
        }

	}
};




module.exports = roomlvl3;
