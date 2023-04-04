/**
 * Use this File to organize functions which do not pertain directly to subscriptions,
 * or which may be referenced by subscriptions and non-subscription functions.
 */

import { Game, SpaceMemberInfo } from "@gathertown/gather-game-client";
import { GTObject } from "../helpers/object-class";
import { commandList } from "../config/commands";
import { cli_output, makeBetterErrors } from "../helpers/errors";

interface MembersArray {
  [key: string]: { [key: string]: SpaceMemberInfo };
}

export const pre_connect_actions = (game: Game) => {
  //Silence is Golden
  makeBetterErrors(game);
  let commands = Object.keys(commandList) ?? undefined;
  if (commands) {
    registerCommands(game, commands);
  }
  getUserRoles(game);
};

export const post_connect_actions = (game: Game) => {
  //Silence is Golden

  testObjects(game);
};

export const testObjects = (game: Game) => {
  let maps = Object.values(game.completeMaps);

  maps.forEach((map) => {
    if (!map.objects) return;

    let objects = Object.values(map.objects);

    objects.forEach(async (object) => {
      let obj = new GTObject(object, game, map.id);
      if (obj.type === 7) {
        cli_output("info", `Obj: ${obj.toString()}`);
      }
    });
  });
};

const registerCommands = (game: Game, commands: string[]): void => {
  game.subscribeToConnection((connected: boolean) => {
    if (connected) {
      for (let cmd of commands) {
        game.registerCommand(cmd);
      }
    }
  });
};

const enterAsNPC = (game: Game): void => {
  game.subscribeToConnection((connected: boolean) => {
    if (connected) {
      game.enter({ isNpc: true });
    }
  });
};

export var spaceRoles: MembersArray = {};

const getUserRoles = (game: Game) => {
  game.subscribeToEvent("spaceSetsSpaceMembers", (data, context) => {
    spaceRoles[game?.spaceId?.split("\\")[0]!] =
      data.spaceSetsSpaceMembers.members;
  });
};
