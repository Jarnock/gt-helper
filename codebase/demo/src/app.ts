import * as connection from "./functions/connection";
import { subscribeToEvents } from "./functions/subscriptions";
import { danceParty } from "./functions/other";
import { commandList } from "./config/commands";
global.WebSocket = require("isomorphic-ws");

const run = async (): Promise<void> => {
  //const commands:string[] = ["example"]; //registers /example as a command
  //const userState:string = ""; //'invis' or 'npc'

  const games = await connection.connectToSpaces(
    Object.keys(commandList) ?? undefined
  );

  for (let id in games) {
    subscribeToEvents(games[id]);

    //Example extension, not rated for >30 guests.
    danceParty(games[id]);
  }
};

run();
