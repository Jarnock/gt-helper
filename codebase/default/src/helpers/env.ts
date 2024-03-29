import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    API_KEY: z.string().min(1),
    SPACE_URLS: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env, // or `import.meta.env`, or similar
});
