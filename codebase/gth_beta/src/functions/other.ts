/**
 * Use this File to organize functions which do not pertain directly to subscriptions,
 * or which may be referenced by subscriptions and non-subscription functions.
 */

import { Game, SpaceMemberInfo } from "@gathertown/gather-game-client";
import { GTObjectFactory } from "../helpers/objects";
import { commandList } from "../config/commands";
import { cli_output, makeBetterErrors } from "../helpers/errors";

interface MembersArray {
  [key: string]: { [key: string]: SpaceMemberInfo };
}

/**
 * This function is called before the game connects.
 * @param game The Gather.town game object
 * @example pre_connect_actions(game)
 *
 */

export const pre_connect_actions = (game: Game) => {
  //Silence is Golden
  makeBetterErrors(game);
  let commands = Object.keys(commandList) ?? undefined;
  if (commands) {
    registerCommands(game, commands);
  }
  getUserRoles(game);
};

/**
 * This function is called after the game connects.
 * @param game The Gather.town game object
 * @example post_connect_actions(game)
 *
 */

export const post_connect_actions = (game: Game) => {
  //Silence is Golden

  testObjects(game);
  testObjectCreation(game);
};

/**
 * This function tests the identification of objects in the game.
 * @param game The Gather.town game object
 * @example testObjects(game)
 *
 */

export const testObjects = (game: Game) => {
  let maps = Object.values(game.completeMaps);

  let all_objects = [];
  let total_objects = 0;
  const typeAssessment: { [key: number]: number } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
  maps.forEach((map) => {
    if (!map.objects) return;

    let objects = Object.values(map.objects);

    objects.forEach(async (object) => {
      let obj = GTObjectFactory.createFromMapObject(object, game, map.id);

      if (obj) {
        total_objects++;
        typeAssessment[obj.type]++;
        all_objects.push(obj);
      }
    });
  });

  cli_output("good", `Total Objects: ${total_objects}`);
  cli_output("info", `Total Objects by Type:`);
  for (let type in typeAssessment) {
    cli_output("info", `Type ${type}: ${typeAssessment[type]}`);
  }
};

/**
 * This function tests the creation of objects in the game.
 * @param game The Gather.town game object
 * @example testObjectCreation(game)
 *
 */

const testObjectCreation = (game: Game) => {
  const obj = GTObjectFactory.create_type_1(
    {
      height: 1,
      width: 1,
      x: 1,
      y: 1,
      highlighted: "",
      type: 1,
      id: "test",
      _name: "test",
      normal: "",
      properties: {
        url: "[test.url]",
      },
    },
    game,
    "test"
  );

  const obj2 = GTObjectFactory.create_type_4(
    {
      ...obj.gt_object,
      type: 4,
      highlighted: "",
      properties: {
        zoomLink: "[test.zoomLink]",
      },
    },
    obj.game,
    obj.map
  );

  cli_output("test", obj.toJSON());
  cli_output("test", obj2.toJSON());
};

/**
 * This function registers commands with the game.
 * @param game The Gather.town game object
 * @param commands The list of commands to register, usually generated from the commands.ts file.
 * @example registerCommands(game, commands)
 *
 */
const registerCommands = (game: Game, commands: string[]): void => {
  game.subscribeToConnection((connected: boolean) => {
    if (connected) {
      for (let cmd of commands) {
        game.registerCommand(cmd);
      }
    }
  });
};

/**
 * This function enters the game as an NPC.
 * @param game The Gather.town game object
 * @example enterAsNPC(game)
 *
 */

const enterAsNPC = (game: Game): void => {
  game.subscribeToConnection((connected: boolean) => {
    if (connected) {
      game.enter({ isNpc: true });
    }
  });
};

/**
 * Variable to store the roles of the users in the space.
 */
export const spaceRoles: MembersArray = {};

/**
 * This function gets the roles of the users in the space.
 * @param game The Gather.town game object

 * @example getUserRoles(game)
 *
 */

const getUserRoles = (game: Game) => {
  game.subscribeToEvent(
    "spaceSetsSpaceMembers",
    ({ spaceSetsSpaceMembers }, context) => {
      spaceRoles[game?.spaceId?.split("\\")[0]!] =
        spaceSetsSpaceMembers.members;
    }
  );
};
