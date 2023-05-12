import { Game, SpaceMemberInfo } from "@gathertown/gather-game-client";
import { checkAccess } from "~helpers/gt-rest-api";
import { cli_output } from "~helpers/errors";
import { subscribeToEvents } from "~functions/subscriptions";
import { handleCommands } from "~helpers/commands";
import { env } from "~helpers/env";

export type GameArray = {
  games: { [space_id: string]: Game };
  pre_connect_actions?: (game: Game) => void;
  post_connect_actions?: (game: Game) => void;
  members: { [space_id: string]: { [id: string]: SpaceMemberInfo } };
};

export const createGameArray = async (urls: string[]): Promise<GameArray> => {
  let gameArray: GameArray = { games: {}, members: {} };
  for (let url of urls) {
    const parser = url.split("?")[0].split("/");
    const cleanName = decodeURI(parser[5]);
    const game = new Game(
      [parser[4], cleanName].join("\\"),
      () => Promise.resolve({ apiKey: env.API_KEY }),
      undefined,
      undefined,
      undefined,
      { logLevels: { warn: false, error: false, log: false, debug: false } }
    );

    if (!(await checkAccess({ spaceId: game.spaceId }))) {
      cli_output("error", `No access to space: ${cleanName}`);
    } else {
      cli_output("info", `Access to space: ${cleanName}`);
      gameArray.games[parser[4]] = game;
    }
  }

  return gameArray;
};

export const connectToGames = (gameArray: GameArray) => {
  Object.entries(gameArray.games).forEach(async ([space_uid, game]) => {
    handleUserRoles(game, gameArray.members[space_uid]);
    handleCommands(game);

    if (gameArray.pre_connect_actions) {
      gameArray.pre_connect_actions(game);
    }

    cli_output("info", `Connecting to ${game.spaceId}`);
    game.connect();

    await game.waitForInit();

    if (game.engine?._connected) {
      cli_output("good", `Connected to ${game.spaceId}`);
    }
    if (gameArray.post_connect_actions) {
      gameArray.post_connect_actions(game);
    }
  });
};

/**
 * This function gets the roles of the users in the space.
 * @param game The Gather.town game object

 * @example getUserRoles(game)
 *
 */

export const handleUserRoles = (
  game: Game,
  memberArray: { [id: string]: SpaceMemberInfo }
) => {
  game.subscribeToEvent(
    "spaceSetsSpaceMembers",
    ({ spaceSetsSpaceMembers }, context) => {
      memberArray = spaceSetsSpaceMembers.members;
    }
  );
};
