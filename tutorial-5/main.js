var controlLvl1 = require('control.lvl1');
var controlLvl2 = require('control.lvl2');
var controlLvl3 = require('control.lvl3');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var spawn in Game.spawns)
    {
        var roomlvl = Game.spawns[spawn].room.controller.level;
        switch(roomlvl)
        {
            case 1:
                    controlLvl1.control(spawn);
                    break;
            case 2:
                    controlLvl2.control(spawn);
                    break;
            case 3:
                    controlLvl3.control(spawn);
                    break;
            case 4:
                    controlLvl1.control(spawn);
                    break;
            case 5:
                    controlLvl1.control(spawn);
                    break;
            case 6:
                    controlLvl1.control(spawn);
                    break;
            case 7:
                    controlLvl1.control(spawn);
                    break;
            case 8:
                    controlLvl1.control(spawn);
                    break;
        }
    }
}
