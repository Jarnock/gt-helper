import { Game } from "@gathertown/gather-game-client";
import { GameArray } from "~helpers/games";

// Purpose: Contains helper functions for other purposes.
export const getSpaceId = (info: { spaceURL?: string; spaceId?: string }) => {
  if (!info.spaceId && !info.spaceURL)
    throw new Error("No spaceId or spaceURL provided");
  if (info.spaceId) return info.spaceId;

  if (!info.spaceURL) throw new Error("No spaceURL provided");

  const urlParser = info.spaceURL.split("/");
  return [
    decodeURIComponent(urlParser[4]),
    decodeURIComponent(urlParser[5]),
  ].join("\\");
};

/**
 * Function checks permissions of given user
 * @param gameArray GameArray object
 * @param space_id Space ID
 * @param playerId Player ID
 * @param role Role to check (OWNER > DEFAULT_BUILDER > DEFAULT_MOD > MEMBER)
 */

const checkUserPermissions = (
  gameArray: GameArray,
  space_id: string,
  playerId: string,
  role: Role
) => {
  //OWNER, DEFAULT_MOD, DEFAULT_BUILDER
  const member = gameArray.members[space_id][playerId];
  if (!member) return false;

  const check_level = roleLevel(role);
  const member_level = roleLevel(member.role as unknown as Role);

  return member_level >= check_level;
};

enum Role {
  OWNER,
  DEFAULT_BUILDER,
  DEFAULT_MOD,
  MEMBER,
}

const roleLevel = (role: Role) => {
  let check_level = -1;
  switch (role) {
    case Role.OWNER:
      check_level = 3;
      break;
    case Role.DEFAULT_BUILDER:
      check_level = 2;
      break;
    case Role.DEFAULT_MOD:
      check_level = 1;
      break;
    case Role.MEMBER:
      check_level = 0;
      break;
  }
  return check_level;
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
