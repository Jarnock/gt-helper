import { Game } from "@gathertown/gather-game-client";

const cli = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  ///////////
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  FgGray: "\x1b[90m",
  ////////////
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
};

export const makeBetterErrors = (game: Game) => {
  game.subscribeToEvent("error", ({ error }, context) => {
    cli_output("error", `${context.spaceId}: ${error.message}`, error.code);
  });

  game.subscribeToEvent("warn", ({ warn }, context) => {
    cli_output("warn", `${context.spaceId}: ${warn.message}`);
  });

  game.subscribeToEvent("info", ({ info }, context) => {
    cli_output("info", `${context.spaceId}: ${info.message}`);
  });
};

export const cli_output = (
  type: "error" | "warn" | "info" | "debug",
  message: string,
  code?: number
) => {
  switch (type) {
    case "error":
      console.log(
        `${cli.FgRed}[${type}]${cli.Reset}${
          code ? ` [${code}] ` : " "
        }${message}`
      );
      break;
    case "warn":
      console.log(
        `${cli.FgYellow}[${type}]${cli.Reset}${
          code ? ` [${code}] ` : " "
        }${message}`
      );
      break;
    case "info":
      console.log(
        `${cli.FgCyan}[${type}]${cli.Reset}${
          code ? ` [${code}] ` : " "
        }${message}`
      );
      break;
    case "debug":
      console.log(
        `${cli.FgGray}[${type}]${cli.Reset}${
          code ? ` [${code}] ` : " "
        }${message}`
      );
      break;
  }
};
