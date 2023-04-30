import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

//This table is used to determine which spaces to connect to.
//Delete at your own risk.
export const spaces = sqliteTable(
  "space",
  {
    id: integer("id").primaryKey(),
    url: text("url").notNull(),
    updatedAt: integer("updatedAt").default(Date.now()).notNull(), //unix timestamp of last update
    lastBackup: integer("lastBackup"), //unix timestamp of last backup
  },
  (spaces) => ({
    urlIdx: uniqueIndex("urlIdx").on(spaces.url),
  })
);
