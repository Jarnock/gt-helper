/**
 * Use this File to organize functions which pertain directly to subscriptions,
 * or which may be referenced by subscriptions.
 */

import { Game } from "@gathertown/gather-game-client";
import { commandList } from "../config/commands";

/*
    //Space Member Permssions, to create Moderator or Owner limited actions.
    Note: spaceId here is the randomly generated characters before the space name, ie spaceId\\spaceName, not both parts
    [spaceId:string]:{playerId:{currentlyEquippedWearables:{...},name:string,roles:{DEFAULT_BUILDER:boolean,OWNER:boolean,DEFAULT_MOD:boolean}}}
*/
import { spaceRoles } from "./other";

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

  /*
    game.subscribeToEvent("playerTriggersItem",({playerTriggersItem},context)=>{
        
    })
    */
};

/**
 * Function checks permissions of given user
 * @param game
 * @param playerId
 * @param roles
 * @param operand //Operation to perform on role array. Defaults to AND
 * @returns
 */

enum Role {
  OWNER,
  DEFAULT_MOD,
  DEFAULT_BUILDER,
  MEMBER,
}

const checkUserPermissions = (
  game: Game,
  playerId: string,
  roles: Role[],
  operand?: "AND" | "OR" | "NOT"
) => {
  //OWNER, DEFAULT_MOD, DEFAULT_BUILDER
  let check: boolean[] = [];
  for (let role of roles) {
    check.push(spaceRoles[game.spaceId!.split("\\")[0]][playerId!].roles[role]);
  }

  switch (operand) {
    case "AND":
      return !check.includes(false);
      break;
    case "OR":
      return check.includes(true);
      break;
    case "NOT":
      return !check.includes(true);
      break;
    default:
      return !check.includes(false);
      break;
  }
};
