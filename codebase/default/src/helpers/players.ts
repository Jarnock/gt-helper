import { DBOutfit, Game, Player } from "@gathertown/gather-game-client";
import { cli_output } from "~helpers/errors";

export const Outfit_Parts_Array = [
  "skin",
  "hair",
  "glasses",
  "hat",
  "top",
  "bottom",
  "shoes",
  "other",
  "jacket",
  "facial_hair",
  "costume",
  "mobility",
] as const;

interface GT_Player extends Partial<Player> {}

//GT Player class

class GTPlayer {
  constructor(
    public player: GT_Player = {
      name: "",
      x: 0,
      y: 0,
      direction: 0,
    } as GT_Player,
    public game?: Game
  ) {
    this.player = player as GT_Player;
    this.game = game as Game;
  }

  getSpriteUrl() {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    if (!this.player.currentlyEquippedWearables) return "";

    return makeAvatarURL(this.player.currentlyEquippedWearables);
  }

  ghost() {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    this.game.ghost(1, this.player.id);
  }

  unghost() {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    this.game.ghost(0, this.player.id);
  }

  setSpeed(speed: number) {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    this.game.setSpeedModifier(speed, this.player.id);
  }

  inventory() {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    return this.player.inventory?.items ?? {};
  }

  getInventoryItem(item: string) {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    return this.player.inventory?.items[item] ?? false;
  }

  giveItem(item: string, increment: number = 1) {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;
    if (!this.player.id) return;

    if (!this.game.spaceItems[item]) {
      cli_output(
        "warn",
        `Item ${item} does not exist in the map as a global item.`
      );
    }

    this.game.addInventoryItem(item, increment, this.player.id);
  }

  removeItem(item: string, decrement: number = 1) {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;
    if (!this.player.id) return;

    if (!this.game.spaceItems[item]) {
      cli_output(
        "warn",
        `Item ${item} does not exist in the map as a global item.`
      );
    }

    this.game.removeInventoryItem(item, decrement, this.player.id);
  }
}

interface Outfit_String_Parts {
  [key: string]: {
    parts: {
      layerId: string;
      spritesheetId: string;
    }[];
  };
}

export const makeAvatarURL = (
  equippedWearables: DBOutfit,
  imgType: "AVATAR" | "PROFILE" = "AVATAR"
) => {
  let spriteUrl = "";
  let spriteUrlStart = "https://dynamic-assets.gather.town/sprite/avatar-";
  switch (imgType) {
    case "AVATAR":
      spriteUrlStart = "https://dynamic-assets.gather.town/sprite/avatar-";
      break;
    case "PROFILE":
      spriteUrlStart =
        "https://dynamic-assets.gather.town/sprite-profile/avatar-";
      break;
    default:
      break;
  }

  if (equippedWearables) {
    var urlParts = [];
    if (equippedWearables["costume"] === null) {
      //loop through sprite parts
      for (let part of Outfit_Parts_Array) {
        if (equippedWearables[part]) {
          urlParts.push(equippedWearables[part]);
        }
      }
      spriteUrl =
        spriteUrlStart + [...urlParts.filter(Boolean)].join(".") + ".png?d=.";
    } else {
      //costume
      spriteUrl = spriteUrlStart + equippedWearables["costume"] + ".png?d=.";
    }
  } else {
    spriteUrl = "";
  }

  return spriteUrl;
};

export default GTPlayer;
