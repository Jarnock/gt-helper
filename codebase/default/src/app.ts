import { Game } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");

import { subscribeToEvents } from "~functions/subscriptions";
import { cli_output, makeBetterErrors } from "~helpers/errors";
import { connectToGames, createGameArray } from "~helpers/games";
import { env } from "~helpers/env";

const run = async (): Promise<void> => {
  const games = await createGameArray(env.SPACE_URLS.split(","));

  cli_output("info", "Games Created");

  games.pre_connect_actions = (game: Game) => {
    cli_output("info", `Pre-Connect Actions for ${game.spaceId}`);
    makeBetterErrors(game);
  };

  games.post_connect_actions = (game: Game) => {
    cli_output("info", `Post-Connect Actions for ${game.spaceId}`);
    subscribeToEvents(game);
  };

  connectToGames(games);
};

run();
