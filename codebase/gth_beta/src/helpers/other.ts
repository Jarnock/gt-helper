interface Outfit_Parts {
  [key: string]: {
    parts: {
      layerId: string;
      spritesheetId: string;
    }[];
  };
}

export const makeAvatarURL = (outfitString: string) => {
  const sprite_parts = [
    "skin",
    "bottom",
    "shoes",
    "top",
    "jacket",
    "glasses",
    "facial_hair",
    "hair",
    "hat",
    "other",
    "mobility",
  ];

  let spriteUrl = "";

  if (outfitString) {
    let spriteJSON: Outfit_Parts = JSON.parse(outfitString);

    const spriteUrlStart = "https://dynamic-assets.gather.town/sprite/avatar-";
    var urlParts = [];

    if (spriteJSON["costume"] === null) {
      //loop through sprite parts and add to urlParts front and back
      for (let part of sprite_parts) {
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
