import { MapObject } from "@gathertown/gather-game-common/dist/src/public/gameMap";
import {
  WireObjectSpritesheet,
  Sound,
} from "@gathertown/gather-game-common/dist/src/generated_DO_NOT_TOUCH/events";
import { Game } from "@gathertown/gather-game-client/dist/src/public/game";
import { InteractionEnum_ENUM } from "@gathertown/gather-game-client";
import crypto from "crypto";

/*

    templateId?: string | undefined;
    _name?: string | undefined;
    _tags: string[];
    x?: number | undefined;
    y?: number | undefined;
    offsetX?: number | undefined;
    offsetY?: number | undefined;
    color?: string | undefined;
    orientation?: number | undefined;
    normal?: string | undefined;
    highlighted?: string | undefined;
    type?: InteractionEnum_ENUM | undefined;
    width?: number | undefined;
    height?: number | undefined;
    extensionClass?: string | undefined;
    previewMessage?: string | undefined;
    distThreshold?: number | undefined;
    propertiesJson?: string | undefined;
    sound?: Sound | undefined;
    objectStartTime?: ObjectTime | undefined;
    objectExpireTime?: ObjectTime | undefined;
    id?: string | undefined;
    customState?: string | undefined;
    objectPlacerId?: string | undefined;
    numGoKarts?: number | undefined;
    spritesheet?: WireObjectSpritesheet | undefined;

*/

interface Type0_Object extends MapObject {
  type: InteractionEnum_ENUM.NONE;
}

interface Type1_Object extends MapObject {
  type: InteractionEnum_ENUM.EMBEDDED_WEBSITE;
  hightlighted: string;
  properties: {
    deterministicUrlPrefix?: string;
    url: string;
  };
}

interface Type2_Object extends MapObject {
  type: InteractionEnum_ENUM.POSTER;
  hightlighted: string;
  properties: {
    image: string;
    preview: string;
  };
}

interface Type3_Object extends MapObject {
  type: InteractionEnum_ENUM.VIDEO;
  hightlighted: string;
  properties: {
    video: string;
  };
}

interface Type4_Object extends MapObject {
  type: InteractionEnum_ENUM.EXTERNAL_CALL;
  hightlighted: string;
  properties: {
    zoomLink: string;
  };
}

interface Type5_Object extends MapObject {
  type: InteractionEnum_ENUM.EXTENSION;
  hightlighted: string;
}

interface Type6_Object extends MapObject {
  type: InteractionEnum_ENUM.NOTE;
  hightlighted: string;
  properties: { message: string };
}

interface Type7_Object extends MapObject {
  type: InteractionEnum_ENUM.MODAL_EXTENSION;
  hightlighted: string;
  properties: {
    extensionData: {
      entries: ModalEntries[];
    };
  };
}

enum ModalEntries_Type_ENUM {
  HEADER = "header",
  PARAGRAPH = "paragraph",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXT = "text",
  PASSWORD = "password",
}

interface ModalEntries_Header {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.HEADER;
}

interface ModalEntries_Paragraph {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.PARAGRAPH;
}

interface ModalEntries_Radio {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.RADIO;
  options: {
    label: string;
    key: string;
  }[];
}

interface ModalEntries_Checkbox {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.CHECKBOX;
  options: {
    label: string;
    key: string;
  }[];
}

interface ModalEntries_Text {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.TEXT;
}

interface ModalEntries_Password {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.PASSWORD;
}

type ModalEntries =
  | ModalEntries_Header
  | ModalEntries_Paragraph
  | ModalEntries_Radio
  | ModalEntries_Checkbox
  | ModalEntries_Text
  | ModalEntries_Password;

interface Type8_Object extends MapObject {
  type: InteractionEnum_ENUM.COMPONENT_MODAL;
  hightlighted: string;
}

interface Type9_Object extends MapObject {
  type: InteractionEnum_ENUM.SIDE_PANEL_TRIGGER;
  hightlighted: string;
}

type GT_Object =
  | Type0_Object
  | Type1_Object
  | Type2_Object
  | Type3_Object
  | Type4_Object
  | Type5_Object
  | Type6_Object
  | Type7_Object
  | Type8_Object
  | Type9_Object;

export class GTObject {
  //Constructor
  constructor(
    public gt_object: GT_Object | MapObject = {
      id: crypto.randomBytes(20).toString("hex"),
      type: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      normal: "",
    },
    public game?: Game,
    public map?: string
  ) {
    this.gt_object = gt_object as GT_Object;

    if (game) {
      this.game = game;
    }

    if (map) {
      this.map = map;
    }
  }

  //Accessors
  get id() {
    return this.gt_object.id ?? "";
  }

  get name() {
    return this.gt_object._name ?? "";
  }

  get type() {
    return this.gt_object.type;
  }

  get x() {
    return this.gt_object.x;
  }

  get y() {
    return this.gt_object.y;
  }

  get width() {
    return this.gt_object.width;
  }

  get height() {
    return this.gt_object.height;
  }

  get normal() {
    return this.gt_object.normal;
  }

  get highlighted() {
    return this.gt_object.highlighted ?? "";
  }

  get previewMessage() {
    return this.gt_object.previewMessage ?? "";
  }

  get customState() {
    return this.gt_object.customState ?? "";
  }

  get distThreshold() {
    return this.gt_object.distThreshold ?? 0;
  }

  get sound() {
    return this.gt_object.sound as Sound;
  }

  get spritesheet() {
    return this.gt_object.spritesheet as WireObjectSpritesheet;
  }

  get properties() {
    return this.gt_object.properties;
  }

  get key() {
    return this.gt_object.key ?? "";
  }

  //Mutators
  set id(id: string) {
    this.gt_object.id = id;
  }

  set name(name: string) {
    this.gt_object._name = name;
  }

  set type(type: number) {
    this.gt_object.type = type;
  }

  set x(x: number) {
    this.gt_object.x = x;
  }

  set y(y: number) {
    this.gt_object.y = y;
  }

  set width(width: number) {
    this.gt_object.width = width;
  }

  set height(height: number) {
    this.gt_object.height = height;
  }

  set normal(normal: string) {
    this.gt_object.normal = normal;
  }

  set highlighted(highlighted: string) {
    this.gt_object.highlighted = highlighted;
  }

  set previewMessage(previewMessage: string) {
    this.gt_object.previewMessage = previewMessage;
  }

  set customState(customState: string) {
    this.gt_object.customState = customState;
  }

  set distThreshold(distThreshold: number) {
    this.gt_object.distThreshold = distThreshold;
  }

  set sound(sound: Sound) {
    this.gt_object.sound = sound;
  }

  set spritesheet(spritesheet: WireObjectSpritesheet) {
    this.gt_object.spritesheet = spritesheet;
  }

  set properties(properties: any) {
    this.gt_object.properties = properties;
  }

  //Object-Level Accessors and Mutators
  get object() {
    return this.gt_object as GT_Object;
  }

  set object(object: GT_Object) {
    this.gt_object = object;
  }

  get objectJSON() {
    return JSON.stringify(this.gt_object);
  }

  //Methods

  //Returns a string representation of the object
  toString() {
    return this.objectJSON;
  }

  //Returns a JSON representation of the object
  toJSON() {
    return this.objectJSON;
  }

  //Returns a boolean value indicating whether the object is equal to another object
  equals(object: GTObject) {
    return this.objectJSON === object.objectJSON;
  }

  //Movement Methods
  moveTo({ x, y }: { x: number; y: number } = { x: 0, y: 0 }) {
    this.x = x;
    this.y = y;

    return this;
  }

  moveBy({ x, y }: { x: number; y: number } = { x: 0, y: 0 }) {
    this.x += x;
    this.y += y;

    return this;
  }

  //Updates the object on the map
  update(await: boolean = false) {
    if (!this.gt_object.id) {
      return;
    }

    if (!this.game) {
      return;
    }

    if (!this.map) {
      return;
    }

    return this.game.setObject(
      this.map,
      this.gt_object.id,
      this.gt_object,
      await
    );
  }
}

export const GTObjectFactory = {
  create: (object: GT_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },
};

export const GTObjectUtils = {
  //Returns a boolean value indicating whether the object is a GTObject
  isGTObject: (object: any) => {
    return object instanceof GTObject;
  },

  //Returns a boolean value indicating whether the object is a GTObject
  isGTObjectJSON: (object: any) => {
    return (
      typeof object === "object" &&
      object !== null &&
      object.hasOwnProperty("id") &&
      object.hasOwnProperty("type") &&
      object.hasOwnProperty("x") &&
      object.hasOwnProperty("y") &&
      object.hasOwnProperty("width") &&
      object.hasOwnProperty("height") &&
      object.hasOwnProperty("normal")
    );
  },

  //Returns a boolean value indicating whether the object is a GTObject
  isGTObjectString: (object: any) => {
    try {
      const parsedObject = JSON.parse(object);
      return GTObjectUtils.isGTObjectJSON(parsedObject);
    } catch (error) {
      return false;
    }
  },

  //Returns a boolean value indicating whether the object is a GTObject
  isGTObjectObject: (object: any) => {
    return GTObjectUtils.isGTObjectJSON(object);
  },
};

export default GTObject;
