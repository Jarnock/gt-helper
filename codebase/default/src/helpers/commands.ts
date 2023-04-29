import { Game } from "@gathertown/gather-game-client";
import { commandList } from "~config/commands";

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
 * This function handles the registration of commands with the game.
 * @param game The Gather.town game object
 * @example handleCommands(game)
 *
 * */
export const handleCommands = (game: Game): void => {
  const commands = Object.keys(commandList) ?? undefined;
  if (commands) {
    registerCommands(game, commands);
  }
};
