/**
 * Use this File to organize functions which pertain directly to subscriptions,
 * or which may be referenced by subscriptions.
 */

import { Game } from "@gathertown/gather-game-client";
import { commandList } from "~config/commands";
/*
    //Space Member Permssions, to create Moderator or Owner limited actions.
    Note: spaceId here is the randomly generated characters before the space name, ie spaceId\\spaceName, not both parts
    [spaceId:string]:{playerId:{currentlyEquippedWearables:{...},name:string,roles:{DEFAULT_BUILDER:boolean,OWNER:boolean,DEFAULT_MOD:boolean}}}
*/

/**
 * This function subscribes to events from the game client
 * @param game Game client
 * @returns void
 * @example subscribeToEvents(game)
 * @todo Implement system where functions self-declare their subscriptions to be bundled later
 */

export const subscribeToEvents = (game: Game): void => {
  /*
    game.subscribeToEvent("playerChats",({playerChats},context)=>{
        
    })
    */
  /*
    game.subscribeToEvent("playerMoves",({playerMoves},context)=>{
        
    })
    */
  /*
    game.subscribeToEvent("playerInteracts",({playerInteracts},context)=>{
        
    })
    */
  /*
  game.subscribeToEvent(
    "playerSendsCommand",
    ({ playerSendsCommand }, context) => {
      const parser = playerSendsCommand.command.split(" ");

      if (Object.keys(commandList).includes(parser[0])) {
        commandList[parser[0]].fx({
          game,
          parser,
          playerSendsCommand,
          context,
        });
      }
    }
  );
  */
  /*
    game.subscribeToEvent("playerTriggersItem",({playerTriggersItem},context)=>{
        
    })
    */
};
