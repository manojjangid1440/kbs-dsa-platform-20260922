import type { NextConfig } from "next";
const config: NextConfig = {
  transpilePackages: [
    "@kbs/ui",
    "@kbs/domain",
    "@kbs/contracts",
    "@kbs/tokens",
  ],
  poweredByHeader: false,
};
export default config;
