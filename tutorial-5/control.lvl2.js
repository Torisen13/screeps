var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester_test = require('role.harvester_test');
var roleWallRepairer = require('role.wallrepair');

var roomlvl1 = {

    /** @param {Creep} creep **/
    control: function(spawn)
    {
        var extensions = Game.spawns[spawn].room.memory.extensions;
        if(extensions != undefined)
        {
            if(extensions < 5)
            {
                //console.log(Game.spawns[spawn].pos.x + "," + Game.spawns[spawn].pos.y);
                let x = Game.spawns[spawn].pos.x;
                let y = Game.spawns[spawn].pos.y;
                let err = Game.spawns[spawn].room.createConstructionSite(x+1, y+1, STRUCTURE_EXTENSION);
                err = Game.spawns[spawn].room.createConstructionSite(x+1, y-1, STRUCTURE_EXTENSION);
                err = Game.spawns[spawn].room.createConstructionSite(x-1, y+1, STRUCTURE_EXTENSION);
                err = Game.spawns[spawn].room.createConstructionSite(x-1, y-1, STRUCTURE_EXTENSION);
                err = Game.spawns[spawn].room.createConstructionSite(x, y+2, STRUCTURE_EXTENSION);
                console.log("Place Extension");
                Game.spawns[spawn].room.memory.extensions += 5;
            }
        }
        else
        {
            Game.spawns[spawn].room.memory.extensions = 0;
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var test = _.filter(Game.creeps, (creep) => creep.memory.role == 'test');
        var wallRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');

        if(test.length < 1)
        {
            var newName = 'Test' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'test'}});
        }

        if(wallRepairer.length < 1)
        {
            var newName = 'WallRepairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'wallRepairer'}});
        }

        if(builders.length < 2)
            {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
            }

        if(upgraders.length < 1)
            {
                var newName = 'Upgrader' + Game.time;
                //console.log('Spawning new upgrader: ' + newName);
                Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], newName,
                    {memory: {role: 'upgrader'}});
            }

        if(harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
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




module.exports = roomlvl1;
