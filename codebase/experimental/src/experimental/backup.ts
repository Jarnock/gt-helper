import path from "path";
import fs from "fs/promises";
import { SPACE_URLS } from "~config/config";
import { cli_output } from "~helpers/errors";
import { getAllMaps } from "~helpers/gt-rest-api";
import { getSpaceId } from "~helpers/other";

export const backup_map = async (spaceId: string) => {
  //Get all maps from space
  const maps = await getAllMaps({ spaceId: spaceId });

  //Check if parent directory has a folder named "backup"
  //If not, create it
  //If yes, continue
  const backupDir = path.join(__dirname, "..", "..", "backup");

  await fs
    .stat(backupDir)
    .then((stats) => {
      if (stats.isDirectory()) {
        // file exists
      } else {
        fs.mkdir(backupDir)
          .then(() => {
            console.log("Backup directory created");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .then(() => {
      console.log("Backup directory exists");
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        // file does not exist
        fs.mkdir(backupDir)
          .then(() => {
            console.log("Backup directory created");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error(err);
      }
    });

  //Create a folder named after the spaceId

  const file_spaceId = spaceId.replace("\\", "_");

  const spaceDir = path.join(backupDir, file_spaceId);

  await fs
    .stat(spaceDir)
    .then((stats) => {
      if (stats.isDirectory()) {
        // file exists
      } else {
        fs.mkdir(spaceDir)
          .then(() => {
            console.log("Space directory created");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .then(() => {
      console.log("Space directory exists");
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        // file does not exist
        fs.mkdir(spaceDir)
          .then(() => {
            console.log("Space directory created");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error(err);
      }
    });

  //Write json file with all maps

  await fs.writeFile(
    path.join(spaceDir, `${file_spaceId}_${Date.now()}.json`),
    JSON.stringify(maps, null, 2)
  );
};

const standard_backup = async () => {
  SPACE_URLS.forEach(async (spaceURL) => {
    const spaceId = getSpaceId({ spaceURL: spaceURL });
    await backup_map(spaceId);
    cli_output("info", `Backed up ${spaceId}`);
  });
};

standard_backup();
