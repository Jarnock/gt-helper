import { Game } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");

import { SPACE_URLS } from "./config/config";
import { post_connect_actions, pre_connect_actions } from "./functions/other";
import { subscribeToEvents } from "./functions/subscriptions";
import { cli_output } from "./helpers/errors";
require("dotenv").config();
const API_KEY = process.env.API_KEY;

interface GameArray {
  [key: string]: Game;
}

export const runtime_errors = () => {
  let errors = false;
  if (!API_KEY) {
    errors = true;
    cli_output("error", "No API key found in .env file");
  }

  if (SPACE_URLS.length === 0) {
    errors = true;
    cli_output("error", "No spaces found in config file");
  }

  return errors;
};

export const connectToSpaces = (): Promise<GameArray> => {
  return new Promise(async (resolve, reject) => {
    let games: GameArray = {};
    try {
      for (let url of SPACE_URLS) {
        const parser = url.split("?")[0].split("/");
        const cleanName = decodeURI(parser[5]);
        const game = new Game(
          [parser[4], cleanName].join("\\"),
          () => Promise.resolve({ apiKey: API_KEY! }),
          undefined,
          undefined,
          undefined,
          { logLevels: { warn: false, error: false, log: false, debug: false } }
        );

        pre_connect_actions(game);

        game.connect();
        await game.waitForInit();

        post_connect_actions(game);

        games[parser[4]] = game;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }

    resolve(games);
  });
};

const run = async (): Promise<void> => {
  const games = await connectToSpaces();

  for (let id in games) {
    subscribeToEvents(games[id]);
  }
};

run();
