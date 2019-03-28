function set_mine_pos(x, y, spawn)
{
    var terrain = Game.spawns[spawn].room.memory.terrain
    if(terrain.get(x,y) != 1)
    {
        Game.spawns[spawn].room.memory.mine_pos.push([x,y])
        Game.spawns[spawn].room.memory.mine_pos_num++;
        let err = Game.spawns[spawn].room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
    }
}

var pregame =
{
    /** @param {Creep} creep **/
    control: function(spawn)
    {
        //check room for keepers
        if(Game.spawns[spawn].room.memory.keeper == undefined)
        {
            //console.log("testing for keeper");
            var keeper = Game.spawns[spawn].room.find(FIND_STRUCTURES,
                {
                    filter: (structure) =>
                    {
                        return (structure.structureType == STRUCTURE_KEEPER_LAIR)
                    }
                });
            if (keeper)
            {
                Game.spawns[spawn].room.memory.keeper = keeper;
                var keeper_source = Game.spawns[spawn].room.memory.keeper[0].pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                Game.spawns[spawn].room.memory.keeper_source = keeper_source;
            }
            else
            {
                Game.spawns[spawn].room.memory.keeper = 0;
                Game.spawns[spawn].room.memory.keeper_source = undefined;
            }
        }

        //find viable sources and number of collection points
        if(Game.spawns[spawn].room.memory.source_collection_pos == undefined)
        {
            Game.spawns[spawn].room.memory.source_collection_pos = [];
            var sources = Game.spawns[spawn].room.find(FIND_SOURCES);
            for(var source in sources)
            {
                if(Game.spawns[spawn].room.memory.keeper_source.id == sources[source].id)
                {
                    console.log("BANNED");
                }
                else
                {
                    console.log("Good");
                    Game.spawns[spawn].room.memory.source_collection_pos.push(sources[source]);
                }
            }

            //find number of viable mining locations
            Game.spawns[spawn].room.memory.mine_pos = [];
            Game.spawns[spawn].room.memory.mine_pos_num = 0;
            var terrain = Game.spawns[spawn].room.getTerrain();
            Game.spawns[spawn].room.memory.terrain = terrain;
            for(source in Game.spawns[spawn].room.memory.source_collection_pos)
            {
                let x = Game.spawns[spawn].room.memory.source_collection_pos[source].pos.x;
                let y = Game.spawns[spawn].room.memory.source_collection_pos[source].pos.y;
                set_mine_pos(x, y+1, spawn);
                set_mine_pos(x, y-1, spawn);
                set_mine_pos(x+1, y, spawn);
                set_mine_pos(x-1, y, spawn);
                set_mine_pos(x+1, y+1, spawn);
                set_mine_pos(x-1, y+1, spawn);
                set_mine_pos(x+1, y-1, spawn);
                set_mine_pos(x-1, y-1, spawn);
            }
        }

        Game.spawns[spawn].room.memory.pregame = 1;
    }
}
module.exports = pregame;
