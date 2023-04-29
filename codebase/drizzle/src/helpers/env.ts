import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    API_KEY: z.string().min(1),
    DATABASE_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env, // or `import.meta.env`, or similar
});
