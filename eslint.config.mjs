import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Match tsconfig's noUnusedLocals/noUnusedParameters, which treat a
      // leading underscore as "deliberately unused".
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "out/**"] },
];

export default config;
