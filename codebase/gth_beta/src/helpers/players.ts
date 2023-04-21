import {
  Game,
  Player,
  PlayerStatusEndOption,
  PlayerStatusOption,
} from "@gathertown/gather-game-client";
import { DBOutfit } from "@gathertown/gather-game-common/src/generated_DO_NOT_TOUCH/events";
import { cli_output } from "./errors";

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

type Outfit_Parts = typeof Outfit_Parts_Array[number];

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

export default GTPlayer;

const test = () => {
  const test = new GTPlayer({
    affiliation: "",
    allowScreenPointer: true,
    connected: true,
    currentDesk: "",
    description: "",
    deskInfo: {
      deskId: "",
    },
    emojiStatus: "",
    focusModeEndTime: "",
    inventory: {
      items: {},
      order: {},
    },
    isNpc: false,
    itemString: "",
    map: "custom-entrance",
    name: "temp",
    personalImageUrl: "",
    phone: "",
    profileImageUrl: "",
    pronouns: "",
    textStatus: "",
    timezone: "",
    title: "",
    city: "",
    country: "",
    status: PlayerStatusOption.Available,
    statusUpdatedAt: "",
    statusEndOption: PlayerStatusEndOption.NONE_SELECTED,
    startDate: "",
    x: 16,
    y: 16,
    direction: 8,
    id: "zacSa07nXnYwQYvT0egR8xyPEnY2",
    ghost: 0,
    spotlighted: 0,
    emote: "",
    away: false,
    activelySpeaking: 0,
    lastActive: "",
    lastInputId: 0,
    whisperId: "",
    isSignedIn: false,
    outfitString:
      '{"skin":{"id":"KPK1RNe5O32vJ8IhOicy","color":"3","name":"typical","type":"skin","subType":null,"style":null,"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/TmOICrwAjr4PZS9HM2OYi","startDate":null,"endDate":null,"parts":[{"layerId":"skin front","spritesheetId":"dQCYs4n7O99ksXuBIe33"}]},"hair":{"id":"y35QPHIGSUKWpQ1-uP2z","color":"blue","name":"pigtail locs","type":"hair","subType":null,"style":null,"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/Mj1JWAHvpf6c-qCrj3QoX","startDate":null,"endDate":null,"parts":[{"layerId":"hair front","spritesheetId":"NTb36_xzTfmj7p1fFQeS"},{"layerId":"hair back","spritesheetId":"aXOs5XM4RRm3d5hcigL5"}]},"facial_hair":null,"top":{"id":"2rOeLyhVn0rLAx7uJCnR","color":"blue","name":"t shirt","type":"top","subType":null,"style":null,"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/pxUsZRzPc_ZricssdDU5Y","startDate":null,"endDate":null,"parts":[{"layerId":"top front","spritesheetId":"C7IFji7TQ01jYMgDzX4q"}]},"bottom":{"id":"oLNpVNy0WKrLGyT5pzUJ","color":"yellow","name":"pants","type":"bottom","subType":null,"style":null,"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/BXiMS3JMFdqVvzbP0wYEu","startDate":null,"endDate":null,"parts":[{"layerId":"bottom front","spritesheetId":"I4pNNrFBSTYiKLTrBgIB"}]},"shoes":{"id":"jWRxPyatM2P0bdzSnf50","color":"black","name":"generic","type":"shoes","subType":null,"style":null,"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/wE2kyECTzosMMoWoKO52S","startDate":null,"endDate":null,"parts":[{"layerId":"shoes front","spritesheetId":"Thh1O95hOZKq4yyTmVQD"}]},"hat":null,"glasses":null,"other":null,"costume":null,"mobility":null,"jacket":null}',
    eventStatus: "",
    inConversation: false,
    currentArea: "",
    vehicleId: "",
    speedModifier: 1,
    isAlone: true,
    isMobile: false,
    followTarget: "",
    manualVideoSrc: "",
    manualDefaultVideoImageSrc: "",
    manualScreenSrc: "",
    subtitle: "",
  });

  test;
};
