/**
 * These functions provide easy access to the REST API endpoints, with type-safety.
 * Not all of these have been tested to their fullest, instead have been constructed based on provided examples.
 */

import axios from "axios";
import { GameMap, Space } from "@gathertown/gather-game-client";
//These endpoints taken from the Gather.town Notion documentation

const API_KEY = process.env.API_KEY;

export const createSpace = async (
  spaceName: string,
  spaceTemplateURL: string,
  spaceReason: string
) => {
  const urlParser = spaceTemplateURL.split("/");
  const { status, data } = await axios({
    method: "POST",
    url: "https://api.gather.town/api/v2/spaces",
    data: {
      name: spaceName,
      sourceSpace: [urlParser[4], urlParser[5]].join("\\"),
      reason: spaceReason,
    },
    headers: {
      apiKey: API_KEY!,
    },
  });

  return `https://app.gather.town/app/${data}`;
};

export const getSpace = async (spaceURL: string) => {
  const urlParser = spaceURL.split("/");
  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      [urlParser[4], urlParser[5]].join("\\")
    )}`,
    headers: {
      apiKey: API_KEY!,
    },
  });

  return data as Space;
};

export const getMap = async (spaceURL: string, mapID: string) => {
  const urlParser = spaceURL.split("/");
  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      [urlParser[4], urlParser[5]].join("\\")
    )}/maps/${encodeURIComponent(mapID)}`,
    headers: {
      apiKey: API_KEY!,
    },
  });

  return data as GameMap;
};

export const setMap = async (
  spaceURL: string,
  mapID: string,
  newMapData: Partial<GameMap>
) => {
  const urlParser = spaceURL.split("/");
  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      [urlParser[4], urlParser[5]].join("\\")
    )}/maps/${encodeURIComponent(mapID)}`,
    data: {
      content: {
        newMapData,
      },
    },
    headers: {
      apiKey: API_KEY!,
    },
  });
};
