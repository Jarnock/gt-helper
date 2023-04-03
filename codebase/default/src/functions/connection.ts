/**
 * The connections file handles all of the websocket connection to the spaces.
 * It is not recommended to alter this file, unless you have a specific reason.
 */

import { Game, SpaceMemberInfo } from "@gathertown/gather-game-client";
import { SPACE_URLS } from "../config/config";
require("dotenv").config();
const API_KEY = process.env.API_KEY;

interface GameArray {
  [key: string]: Game;
}

interface MembersArray {
  [key: string]: { [key: string]: SpaceMemberInfo };
}

export var spaceRoles: MembersArray = {};

export const connectToSpaces = (commands?: string[]): Promise<GameArray> => {
  return new Promise(async (resolve, reject) => {
    let games: GameArray = {};
    try {
      for (let url of SPACE_URLS) {
        const parser = url.split("?")[0].split("/");
        const cleanName = decodeURI(parser[5]);
        const game = new Game([parser[4], cleanName].join("\\"), () =>
          Promise.resolve({ apiKey: API_KEY! })
        );

        if (commands) {
          registerCommands(game, commands);
        }
        getUserRoles(game);
        //enterAsNPC(game); /*Remove comment line to enter space as NPC*/
        game.connect();
        await game.waitForInit();
        games[parser[4]] = game;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }

    resolve(games);
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

const getUserRoles = (game: Game) => {
  game.subscribeToEvent("spaceSetsSpaceMembers", (data, context) => {
    spaceRoles[game?.spaceId?.split("\\")[0]!] =
      data.spaceSetsSpaceMembers.members;
  });
};
