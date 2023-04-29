#!/usr/bin/env node

import { promisify } from "util";
import { exec } from "child_process";
import ora from "ora";
import fse, { pathExists } from "fs-extra";
import path from "path";
import { Command } from "commander";
import { fileURLToPath } from "url";
import figlet from "figlet";
import inquirer from "inquirer";
import isValidFilename from "valid-filename";

type BuildOptions = {
  name: string;
  database: boolean;
  experimental: boolean;
  orm: "none" | "prisma" | "drizzle";
};

const GT_HELPER = "gt-helper";

const execa = promisify(exec);

const main = async () => {
  runCli();
};

const getCodebasePath = () => {
  const __dirname = path.join(fileURLToPath(import.meta.url), "..", "..");
  return path.join(__dirname, "codebase");
};

const makeProjectDir = async (name: string) => {
  const parent_dir = process.cwd();
  await fse.mkdir(path.join(parent_dir, name));
  process.chdir(path.join(parent_dir, name));
  return path.join(parent_dir, name);
};

const renameDotFiles = async () => {
  const parent_dir = process.cwd();
  await fse.rename(
    path.join(parent_dir, "_gitignore"),
    path.join(parent_dir, ".gitignore")
  );
  await fse.rename(
    path.join(parent_dir, "_env"),
    path.join(parent_dir, ".env")
  );
  return;
};

const generateCodeBase = async (options: BuildOptions) => {
  const codebase_path = getCodebasePath();
  const parent_dir = process.cwd();

  const default_code_files = path.join(codebase_path, "default");

  await fse.copy(default_code_files, parent_dir);

  if (options.database) {
    const database_code_files = path.join(codebase_path, "no-orm");
    await fse.copy(database_code_files, parent_dir, { overwrite: true });

    if (options.orm === "prisma") {
      const prisma_code_files = path.join(codebase_path, "prisma");
      await fse.copy(prisma_code_files, parent_dir, { overwrite: true });
    } else if (options.orm === "drizzle") {
      const drizzle_code_files = path.join(codebase_path, "drizzle");
      await fse.copy(drizzle_code_files, parent_dir, { overwrite: true });
    }
  }

  if (options.experimental) {
    const experimental_code_files = path.join(codebase_path, "experimental");
    await fse.copy(experimental_code_files, parent_dir, { overwrite: true });
  }

  //read package.json in current directory
  const packageData = fse.readJSONSync(path.join(parent_dir, "package.json"));

  //update package.json with project name
  packageData.name = options.name;

  //if experimental features are enabled, add experimental scripts
  if (options.experimental) {
    packageData.scripts = {
      ...packageData.scripts,
      backup:
        "npx ts-node -r tsconfig-paths/register src/experimental/backup.ts",
    };
  }

  //write package.json back to current directory
  fse.writeJSONSync(path.join(parent_dir, "package.json"), packageData);

  await renameDotFiles();

  return;
};

const runCli = async () => {
  //clear terminal
  console.clear();

  console.log(
    figlet.textSync("GT - Helper", {
      font: "Doom",
    })
  );

  const buildOptions: BuildOptions = {
    name: "my-gt-extension",
    database: false,
    experimental: false,
    orm: "none",
  };

  const program = new Command();

  program
    .name(GT_HELPER)
    .description("A CLI for creating Gather.Town boilerplate.")
    .option("--name <name>", "Specify project name")
    .option("--orm <orm>", "Specify ORM to use")
    .option("--experimental", "Enable experimental features")
    .parse(process.argv);

  const options = program.opts();

  console.log("Options: ", options);

  if (options.name) {
    buildOptions.name = options.name;
  }

  if (
    options.orm === "none" ||
    options.orm === "prisma" ||
    options.orm === "drizzle"
  ) {
    if (options.orm !== "none") {
      buildOptions.database = true;
    }
    buildOptions.orm = options.orm;
  }

  if (options.experimental) {
    buildOptions.experimental = true;
  }

  const initalPrompt = [];

  if (options.name === undefined) {
    initalPrompt.push({
      type: "input",
      name: "name",
      message: "What is the name of your project?",
      default: buildOptions.name,
    });
  }

  if (!options.experimental) {
    initalPrompt.push({
      type: "confirm",
      name: "experimental",
      message: "Would you like to enable experimental features?",
      default: buildOptions.experimental,
    });
  }

  if (options.orm === undefined) {
    initalPrompt.push({
      type: "confirm",
      name: "database",
      message: "Would you like to use a database?",
      default: buildOptions.database,
    });
  }

  if (initalPrompt.length !== 0) {
    console.log("Welcome to GT-Helper!");
    const answers = await inquirer.prompt(initalPrompt);

    buildOptions.name = answers.name;
    buildOptions.experimental = answers.experimental;
    buildOptions.database = answers.database;

    if (answers.database) {
      const ormAnswers = await inquirer.prompt([
        {
          type: "list",
          name: "orm",
          message: "Which ORM would you like to use?",
          choices: ["none", "prisma", "drizzle"],
          default: buildOptions.orm,
        },
      ]);

      buildOptions.orm = ormAnswers.orm;
    }
  }

  //Validate buildOptions name is valid for file path
  if (!isValidFilename(buildOptions.name)) {
    console.log("Invalid project name. Please try again.");
    process.exit(1);
  }

  //Determine if project directory already exists
  const projectDir = path.join(process.cwd(), buildOptions.name);
  if (await pathExists(projectDir)) {
    console.log("Project directory already exists. Please try again.");
    process.exit(1);
  }

  const npm_spinner = ora("Initializing Project");
  npm_spinner.color = "red";
  npm_spinner.spinner = "dots9";

  const code_spinner = ora("Installing Codebase");
  code_spinner.color = "green";
  code_spinner.spinner = "dots9";

  const install_spinner = ora("Installing Modules");
  install_spinner.color = "blue";
  install_spinner.spinner = "dots9";

  const prisma_spinner = ora("Installing Prisma");
  prisma_spinner.color = "magenta";
  prisma_spinner.spinner = "dots9";

  npm_spinner.start();
  await makeProjectDir(buildOptions.name);
  await execa("npm init -y");
  npm_spinner.succeed("Project Initialized");

  code_spinner.start();
  await generateCodeBase(buildOptions);
  code_spinner.succeed("Codebase Installed Successfully");

  install_spinner.start();
  await execa("npm install");
  install_spinner.succeed("Module Installation Complete");

  if (buildOptions.orm === "prisma") {
    prisma_spinner.start();
    await execa("npx prisma generate");
    prisma_spinner.succeed("Prisma Generated Successfully");
  }

  console.log("Project created successfully!");
  console.log("To get started:");
  console.log(`cd ${buildOptions.name}`);

  if (buildOptions.database) {
    console.log(
      "Add your API Key to the .env file, and your Space URL(s) to the database."
    );
  } else {
    console.log("Add your API Key and Space URL(s) to the .env file.");
  }

  return;
};

main().catch((err) => {
  console.log("Aborting installation...");
  if (err instanceof Error) {
    console.log(err);
  } else {
    console.log(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
