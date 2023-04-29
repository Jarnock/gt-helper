import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

//This table is used to determine which spaces to connect to.
//Delete at your own risk.
export const spaceURLs = sqliteTable(
  "space",
  {
    id: integer("id").primaryKey(),
    url: text("url").notNull(),
    updatedAt: integer("updatedAt").notNull(), //unix timestamp of last update
    lastBackup: integer("lastBackup"), //unix timestamp of last backup
  },
  (space) => ({
    nameIdx: uniqueIndex("nameIdx").on(space.url),
  })
);
