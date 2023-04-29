/**
 * These functions provide easy access to the REST API endpoints, with type-safety.
 * Not all of these have been tested to their fullest, instead have been constructed based on provided examples.
 */

import axios from "axios";
import { GameMap } from "@gathertown/gather-game-client";
import { getSpaceId } from "./other";
//These endpoints taken from the Gather.town Notion documentation
require("dotenv").config();
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

export const getSpace = async (info: {
  spaceURL?: string;
  spaceId?: string;
}) => {
  let _spaceId = getSpaceId(info);

  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      _spaceId
    )}`,
    headers: {
      apiKey: API_KEY!,
    },
  });

  return data;
};

export const getMap = async (
  info: { spaceURL?: string; spaceId?: string },
  mapID: string
) => {
  let _spaceId = getSpaceId(info);

  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      _spaceId
    )}/maps/${encodeURIComponent(mapID)}`,
    headers: {
      apiKey: API_KEY!,
    },
  });

  return data as GameMap;
};

export const setMap = async (
  info: { spaceURL?: string; spaceId?: string },
  mapID: string,
  newMapData: Partial<GameMap>
) => {
  let _spaceId = getSpaceId(info);

  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      _spaceId
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

  return status;
};

interface Space {
  [id: string]: GameMap;
}

export const getAllMaps = async (info: {
  spaceURL?: string;
  spaceId?: string;
}) => {
  let _spaceId = getSpaceId(info);
  if (!API_KEY) throw new Error("No API key provided. (API_KEY env variable)");

  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      _spaceId
    )}/maps/`,
    headers: {
      apiKey: API_KEY,
    },
  });

  return data as Space;
};

export const checkAccess = async (
  info: {
    spaceURL?: string;
    spaceId?: string;
  },
  gt_id?: string
) => {
  let id = gt_id;
  if (!id) id = "me";

  let _spaceId = getSpaceId(info);
  if (!API_KEY) throw new Error("No API key provided. (API_KEY env variable)");

  const { status, data } = await axios({
    method: "GET",
    url: `https://api.gather.town/api/v2/users/${id}/spaces/${encodeURIComponent(
      _spaceId
    )}/access`,
    headers: {
      apiKey: API_KEY,
    },
  });

  return data.hasAccess as boolean;
};
