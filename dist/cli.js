#!/usr/bin/env node
import { promisify } from "util";
import { exec } from "child_process";
import ora from "ora";
import fse from "fs-extra";
import path from "path";
import { Command } from "commander";
import { fileURLToPath } from "url";
const GT_HELPER = "gt-helper";
const execa = promisify(exec);
const main = async () => {
    runCli();
};
const generateCodeBase = async (option) => {
    const parent_dir = process.cwd();
    const __dirname = path.join(fileURLToPath(import.meta.url), "..", "..");
    let copy_folder = "gth_default";
    switch (option) {
        case "default":
            copy_folder = "gth_default";
            break;
        case "demo":
            copy_folder = "gth_demo";
            break;
        case "prisma":
            copy_folder = "gth_prisma";
            break;
        case "prisma-demo":
            copy_folder = "gth_prisma-demo";
            break;
        case "rest":
            copy_folder = "gth_rest";
            break;
        case "beta":
            copy_folder = "gth_beta";
        default:
            break;
    }
    let newpath = path.join(__dirname, "codebase", copy_folder);
    await fse.copy(newpath, parent_dir);
    await fse.rename(path.join(parent_dir, "_gitignore"), path.join(parent_dir, ".gitignore"));
    await fse.rename(path.join(parent_dir, "_env"), path.join(parent_dir, ".env"));
    return;
};
const runCli = async () => {
    const program = new Command().name(GT_HELPER);
    program
        .description("A CLI for creating Gather.Town boilerplate.")
        .argument("[option]", "The version of GT-Helper Boilerplate to install.")
        .parse(process.argv);
    let cliProvidedOption = program.args[0];
    if (!cliProvidedOption) {
        cliProvidedOption = "default";
    }
    const npm_spinner = ora("Initializing Project");
    npm_spinner.color = "red";
    npm_spinner.spinner = "dots9";
    const code_spinner = ora("Generating Codebase");
    code_spinner.color = "green";
    code_spinner.spinner = "dots9";
    const install_spinner = ora("Installing Modules");
    install_spinner.color = "blue";
    install_spinner.spinner = "dots9";
    npm_spinner.start();
    await execa("npm init -y");
    npm_spinner.succeed("Initialized");
    code_spinner.start();
    await generateCodeBase(cliProvidedOption);
    code_spinner.succeed("Generated");
    install_spinner.start();
    await execa("npm install");
    install_spinner.succeed("Installation Complete");
};
main().catch((err) => {
    console.log("Aborting installation...");
    if (err instanceof Error) {
        console.log(err);
    }
    else {
        console.log("An unknown error has occurred. Please open an issue on github with the below:");
        console.log(err);
    }
    process.exit(1);
});
