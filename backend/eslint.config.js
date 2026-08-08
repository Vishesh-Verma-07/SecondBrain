import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules", "dist", "build"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,
  {
    files: ["src/middlewares/middleware.ts"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
    },
  },
);
