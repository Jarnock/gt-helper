import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { spaces } from "~db/schema/spaces";
import { env } from "~helpers/env";
import { InferModel } from "drizzle-orm";

type Space = InferModel<typeof spaces>;
type InsertSpace = InferModel<typeof spaces, "insert">;

const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle(sqlite);

export const getURLs = () => {
  const result = db
    .select()
    .from(spaces)
    .all()
    .map((data) => data.url);
  return result;
};

export const addURL = (space: InsertSpace) => {
  db.insert(spaces).values({ url: space.url }).run();
};
