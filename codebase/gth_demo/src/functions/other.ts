/**
 * Use this File to organize functions which do not pertain directly to subscriptions,
 * or which may be referenced by subscriptions and non-subscription functions.
 */

import { Game } from "@gathertown/gather-game-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const danceParty = (game: Game): void => {
  let randomTime = Math.floor(Math.random() * 300);

  setInterval(() => {
    for (let player of Object.keys(game.players)) {
      game.move(4, false, player);
    }
    randomTime = Math.floor(Math.random() * 300);
  }, randomTime);
};

export const createNewUser = async (user_email: string, user_name?: string) => {
  await prisma.user.create({
    data: {
      email: user_email,
      name: user_name ?? "Anon",
    },
  });
};

export const getUser = async (user_email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: user_email,
    },
  });
};
