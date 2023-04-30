import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export const getURLs = async () => {
  const result = await prisma.space.findMany();
  return result.map((data) => data.url);
};

export const addURL = async (url: string) => {
  await prisma.space.upsert({
    where: { url },
    update: {},
    create: { url },
  });
};
