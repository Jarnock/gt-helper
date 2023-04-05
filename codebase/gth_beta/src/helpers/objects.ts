import { MapObject } from "@gathertown/gather-game-common/dist/src/public/gameMap";
import {
  WireObjectSpritesheet,
  Sound,
} from "@gathertown/gather-game-common/dist/src/generated_DO_NOT_TOUCH/events";
import { Game } from "@gathertown/gather-game-client/dist/src/public/game";
import { InteractionEnum_ENUM } from "@gathertown/gather-game-client";
import crypto from "crypto";

/*  MapObject interface from @gathertown

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

///////////////////////////////////////////
////////// GT Object Interfaces ///////////
///////////////////////////////////////////

/**
 * Base interface for all Type 0 GT Objects
 * @requires type: 0
 */
interface Type0_Object extends MapObject {
  type: InteractionEnum_ENUM.NONE;
}

/**
 * Base interface for all Type 1 GT Objects
 * @requires `type: 1`
 * @requires `highlighted: string`
 * @requires `properties: { url: string }`
 */
interface Type1_Object extends MapObject {
  type: InteractionEnum_ENUM.EMBEDDED_WEBSITE;
  highlighted: string;
  properties: {
    deterministicUrlPrefix?: string;
    url: string;
  };
}

/**
 * Base interface for all Type 2 GT Objects
 * @requires `type: 2`
 * @requires `highlighted: string`
 * @requires `properties: { image: string, preview: string }`
 */
interface Type2_Object extends MapObject {
  type: InteractionEnum_ENUM.POSTER;
  highlighted: string;
  properties: {
    image: string;
    preview: string;
  };
}

/**
 * Base interface for all Type 3 GT Objects
 * @requires `type: 3`
 * @requires `highlighted: string`
 * @requires `properties: { video: string }`
 */
interface Type3_Object extends MapObject {
  type: InteractionEnum_ENUM.VIDEO;
  highlighted: string;
  properties: {
    video: string;
  };
}

/**
 * Base interface for all Type 4 GT Objects
 * @requires `type: 4`
 * @requires `highlighted: string`
 * @requires `properties: { zoomLink: string }`
 */
interface Type4_Object extends MapObject {
  type: InteractionEnum_ENUM.EXTERNAL_CALL;
  highlighted: string;
  properties: {
    zoomLink: string;
  };
}

/**
 * Base interface for all Type 5 GT Objects
 * @requires `type: 5`
 * @requires `highlighted: string`
 * @note This is a special object type, as it does not cause any iframe or modal to appear
 */
interface Type5_Object extends MapObject {
  type: InteractionEnum_ENUM.EXTENSION;
  highlighted: string;
}

/**
 * Base interface for all Type 6 GT Objects
 * @requires `type: 6`
 * @requires `highlighted: string`
 * @requires `properties: { message: string }`
 * @note This uses the default "yellow paper" modal
 */
interface Type6_Object extends MapObject {
  type: InteractionEnum_ENUM.NOTE;
  highlighted: string;
  properties: { message: string };
}

/**
 * Base interface for all Type 7 GT Objects
 * @requires `type: 7`
 * @requires `highlighted: string`
 * @requires `properties: { extensionData: { entries: ModalEntries[] } }`
 * @note This is the default modal object type.
 */
interface Type7_Object extends MapObject {
  type: InteractionEnum_ENUM.MODAL_EXTENSION;
  highlighted: string;
  properties: {
    extensionData: {
      entries: ModalEntries[];
    };
  };
}

/**
 * Base interface for all Type 8 GT Objects
 * @requires `type: 8`
 * @requires `highlighted: string`
 * Not currently implemented for public use
 */
interface Type8_Object extends MapObject {
  type: InteractionEnum_ENUM.COMPONENT_MODAL;
  highlighted: string;
}

/**
 * Base interface for all Type 9 GT Objects
 * @requires `type: 9`
 * @requires `highlighted: string`
 * Not currently implemented for public use
 */
interface Type9_Object extends MapObject {
  type: InteractionEnum_ENUM.SIDE_PANEL_TRIGGER;
  highlighted: string;
}

///////////////////////////////////////////
////////// Modal Entry Helpers ////////////
///////////////////////////////////////////

/**
 * Enum for the different types of modal entries
 * @readonly
 * @enum {string}
 */
enum ModalEntries_Type_ENUM {
  HEADER = "header",
  PARAGRAPH = "paragraph",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXT = "text",
  PASSWORD = "password",
}

/**
 * Base interface for Header entries
 * @requires `type: "header"`
 * @requires `value: string`
 * @requires `key: string`
 */
type ModalEntries_Header = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.HEADER;
};

/**
 * Base interface for Paragraph entries
 * @requires `type: "paragraph"`
 * @requires `value: string`
 * @requires `key: string`
 */
type ModalEntries_Paragraph = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.PARAGRAPH;
};

/**
 * Base interface for Radio entries
 * @requires `type: "radio"`
 * @requires `value: string`
 * @requires `key: string`
 * @requires `options: { label: string, key: string }[]`
 */
type ModalEntries_Radio = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.RADIO;
  options: {
    label: string;
    key: string;
  }[];
};

/**
 * Base interface for Checkbox entries
 * @requires `type: "checkbox"`
 * @requires `value: string`
 * @requires `key: string`
 * @requires `options: { label: string, key: string }[]`
 */
type ModalEntries_Checkbox = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.CHECKBOX;
  options: {
    label: string;
    key: string;
  }[];
};

/**
 * Base interface for Text Input entries
 * @requires `type: "text"`
 * @requires `value: string`
 * @requires `key: string`
 */
type ModalEntries_Text = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.TEXT;
};

/**
 * Base interface for Password Input entries
 * @requires `type: "password"`
 * @requires `value: string`
 * @requires `key: string`
 */
type ModalEntries_Password = {
  value: string;
  key: string;
  type: ModalEntries_Type_ENUM.PASSWORD;
};

////////////////////////////////
////////// Type Joins //////////
////////////////////////////////

type ModalEntries =
  | ModalEntries_Header
  | ModalEntries_Paragraph
  | ModalEntries_Radio
  | ModalEntries_Checkbox
  | ModalEntries_Text
  | ModalEntries_Password;

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

///////////////////////////////////////////
////////// GT Object Class ////////////////
///////////////////////////////////////////

/**
 * Class for GT Objects
 * @param {GT_Object} gt_object - The GT Object to be used
 * @param {Game} game - The game object to be used
 * @param {string} map - The map the object exists on
 *
 * @note This class is not meant to be used directly, but rather through `GTObjectFactory`
 */

class GTObject {
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
    switch (gt_object.type ?? InteractionEnum_ENUM.NONE) {
      case InteractionEnum_ENUM.NONE:
        this.gt_object = gt_object as Type0_Object;
        break;
      case InteractionEnum_ENUM.EMBEDDED_WEBSITE:
        this.gt_object = gt_object as Type1_Object;
        break;
      case InteractionEnum_ENUM.POSTER:
        this.gt_object = gt_object as Type2_Object;
        break;
      case InteractionEnum_ENUM.VIDEO:
        this.gt_object = gt_object as Type3_Object;
        break;
      case InteractionEnum_ENUM.EXTERNAL_CALL:
        this.gt_object = gt_object as Type4_Object;
        break;
      case InteractionEnum_ENUM.EXTENSION:
        this.gt_object = gt_object as Type5_Object;
        break;
      case InteractionEnum_ENUM.NOTE:
        this.gt_object = gt_object as Type6_Object;
        break;
      case InteractionEnum_ENUM.MODAL_EXTENSION:
        this.gt_object = gt_object as Type7_Object;
        break;
      case InteractionEnum_ENUM.COMPONENT_MODAL:
        this.gt_object = gt_object as Type8_Object;
        break;
      case InteractionEnum_ENUM.SIDE_PANEL_TRIGGER:
        this.gt_object = gt_object as Type9_Object;
        break;
      default:
        this.gt_object = gt_object as GT_Object;
        break;
    }

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

  /**
   * Moves the object to the given tile coordinates
   */
  moveTo({ x, y }: { x: number; y: number } = { x: 0, y: 0 }) {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Moves the object by a given amount of tiles
   */
  moveBy({ x, y }: { x: number; y: number } = { x: 0, y: 0 }) {
    this.x += x;
    this.y += y;

    return this;
  }

  /**
   * Updates the object on the map
   * @param await Whether to await the update or not. Defaults to false.
   *
   */
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

//////////////////////////////////
//////// GTObjectFactory /////////
//////////////////////////////////

/**
 * GTObjectFactory
 * @description A factory class for creating GTObjects
 * @example const object = GTObjectFactory.create(gt_object);
 */
export const GTObjectFactory = {
  /**
   * @param object GT_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a GT_Object
   * @example const object = GTObjectFactory.create(gt_object);
   */
  create: (object: GT_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object MapObject
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a MapObject
   * @example const object = GTObjectFactory.createFromMapObject(map_object);
   */
  createFromMapObject: (object: MapObject, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type1_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type1_Object
   * @example const object = GTObjectFactory.create_type_1(type1_object);
   */
  create_type_1: (object: Type1_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type2_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type2_Object
   * @example const object = GTObjectFactory.create_type_2(type2_object);
   */
  create_type_2: (object: Type2_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type3_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type3_Object
   * @example const object = GTObjectFactory.create_type_3(type3_object);
   */
  create_type_3: (object: Type3_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type4_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type4_Object
   * @example const object = GTObjectFactory.create_type_4(type4_object);
   */
  create_type_4: (object: Type4_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type5_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type5_Object
   * @example const object = GTObjectFactory.create_type_5(type5_object);
   */
  create_type_5: (object: Type5_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type6_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type6_Object
   * @example const object = GTObjectFactory.create_type_6(type6_object);
   */
  create_type_6: (object: Type6_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type7_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type7_Object
   * @example const object = GTObjectFactory.create_type_7(type7_object);
   */
  create_type_7: (object: Type7_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type8_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type8_Object
   * @example const object = GTObjectFactory.create_type_8(type8_object);
   */
  create_type_8: (object: Type8_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },

  /**
   * @param object Type9_Object
   * @param game Game
   * @param map Map ID
   * @returns GTObject
   * @description Creates a GTObject from a Type9_Object
   * @example const object = GTObjectFactory.create_type_9(type9_object);
   */
  create_type_9: (object: Type9_Object, game?: Game, map?: string) => {
    return new GTObject(object, game, map);
  },
};

//////////////////////////////////
///////// GTObjectUtils //////////
//////////////////////////////////

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

export default GTObjectFactory;
