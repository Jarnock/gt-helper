import { Game, Player } from "@gathertown/gather-game-client";
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

type Outfit_Parts = (typeof Outfit_Parts_Array)[number];

interface GT_Player extends Partial<Player> {
  outfit_json?: {
    [key in Outfit_Parts]?: Partial<GT_Outfit_Part>;
  };

  outfit?: {
    [key in Outfit_Parts]: {
      front?: string;
      back?: string;
    };
  };
}

type GT_Outfit_Part = {
  id: string;
  color: string;
  name: string;
  type: string;
  subType?: string;
  style?: string;
  isDefault: boolean;
  previewUrl: string;
  startDate: null;
  endDate: null;
  parts: {
    layerId: string;
    spritesheetId: string;
  }[];
};

//GT Player class

class GTPlayer {
  constructor(
    public player: GT_Player = {
      name: "",
      x: 0,
      y: 0,
      direction: 0,
      outfitString: "",
      outfit_json: undefined,
      outfit: undefined,
    } as GT_Player,
    public game?: Game
  ) {
    this.player = player as GT_Player;
    this.player.outfit_json = JSON.parse(
      player.outfitString || JSON.stringify({})
    ) as GT_Player["outfit_json"];
    this.player.outfit = this.parseOutfit(this.player.outfit_json);
    this.game = game as Game;
  }

  parseOutfit(outfit: GT_Player["outfit_json"]): GT_Player["outfit"] {
    const parsedOutfit: GT_Player["outfit"] = {
      skin: { front: "", back: "" },
      hair: { front: "", back: "" },
      glasses: { front: "", back: "" },
      hat: { front: "", back: "" },
      top: { front: "", back: "" },
      bottom: { front: "", back: "" },
      shoes: { front: "", back: "" },
      other: { front: "", back: "" },
      jacket: { front: "", back: "" },
      facial_hair: { front: "", back: "" },
      costume: { front: "", back: "" },
      mobility: { front: "", back: "" },
    };

    if (!outfit) return parsedOutfit;

    for (const [key, value] of Object.entries(outfit)) {
      const part = key as Outfit_Parts;
      if (!value || !value.parts || value.parts.length > 0) continue;
      value.parts.forEach((sprite_part) => {
        const { layerId, spritesheetId } = sprite_part;
        if (!layerId || !spritesheetId) return;
        if (!parsedOutfit?.[part]?.front) return;
        if (!parsedOutfit?.[part]?.back) return;
        if (layerId.includes("front")) {
          parsedOutfit[part].front = spritesheetId;
        } else if (layerId.includes("back")) {
          parsedOutfit[part].back = spritesheetId;
        }
      });
    }

    return parsedOutfit;
  }

  async updateOutfitString(outfitString: string) {
    this.player.outfitString = outfitString;

    this.player.outfit_json = JSON.parse(
      this.player.outfitString || JSON.stringify({})
    ) as GT_Player["outfit_json"];

    this.player.outfit = this.parseOutfit(this.player.outfit_json);
  }

  async updateOutfitJSON(outfit_json: GT_Player["outfit_json"]) {
    this.player.outfit_json = outfit_json;

    this.player.outfitString = JSON.stringify(this.player.outfit_json);

    this.player.outfit = this.parseOutfit(this.player.outfit_json);
  }

  async updateOutfit(outfit: GT_Player["outfit"]) {
    if (!outfit) return;
    this.player.outfit = outfit;

    const outfit_json: Partial<GT_Player["outfit_json"]> =
      this.player.outfit_json || {};

    for (const [key, value] of Object.entries(outfit)) {
      const part = key as Outfit_Parts;
      if (!value) continue;
      const { front, back } = value;
      if (!front || !back) continue;
      if (!outfit_json[part]) {
        outfit_json[part] = {
          ...outfit_json[part],
          parts: [
            {
              layerId: `${part} front`,
              spritesheetId: front,
            },
            {
              layerId: `${part} back`,
              spritesheetId: back,
            },
          ],
        };
      }

      if (outfit_json[part]) {
        outfit_json[part] = {
          parts: [
            {
              layerId: `${part} front`,
              spritesheetId: front,
            },
            {
              layerId: `${part} back`,
              spritesheetId: back,
            },
          ],
        };
      }
    }
  }

  getSpriteUrl() {
    if (!this.game) return;
    if (!this.game.engine?._connected) return;

    if (!this.player.outfitString) return makeAvatarURL("");

    return makeAvatarURL(this.player.outfitString);
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

export const makeAvatarURL = (outfitString: string) => {
  let spriteUrl = "";

  if (outfitString) {
    let spriteJSON: Outfit_String_Parts = JSON.parse(outfitString);

    const spriteUrlStart = "https://dynamic-assets.gather.town/sprite/avatar-";
    var urlParts = [];

    if (spriteJSON["costume"] === null) {
      //loop through sprite parts and add to urlParts front and back
      for (let part of Outfit_Parts_Array) {
        if (!spriteJSON[part]?.parts) continue;
        for (let sprite of spriteJSON[part].parts) {
          if (!sprite?.layerId) continue;
          switch (sprite.layerId.split(" ")[1]) {
            case "back":
              urlParts.unshift(sprite.spritesheetId);
              break;
            case "front":
              urlParts.push(sprite.spritesheetId);
              break;
            default:
              break;
          }
        }
      }
      spriteUrl =
        spriteUrlStart + [...urlParts.filter(Boolean)].join(".") + ".png?d=.";
    } else {
      //costume
      if (spriteJSON["costume"]?.parts) {
        for (let sprite of spriteJSON["costume"].parts) {
          if (!sprite.layerId) continue;
          switch (sprite.layerId.split(" ")[1]) {
            case "back":
              urlParts.unshift(sprite.spritesheetId);
              break;
            case "front":
              urlParts.push(sprite.spritesheetId);
              break;
            default:
              break;
          }
        }
      }

      spriteUrl =
        spriteUrlStart + [...urlParts.filter(Boolean)].join(".") + ".png?d=.";
    }
  } else {
    spriteUrl = "";
  }

  return spriteUrl;
};

export default GTPlayer;
