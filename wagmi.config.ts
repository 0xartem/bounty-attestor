import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";
import { ATTESTATION_STATION_ADDRESS } from "@eth-optimism/atst";

/**
 * Wagmi cli will automatically generate react hooks from your forge contracts
 * @see https://wagmi.sh/cli/getting-started
 * You can also generate hooks from etherscan
 * @see https://wagmi.sh/cli/plugins/etherscan
 * Or for erc20 erc721 tokens
 * @see https://wagmi.sh/cli/plugins/erc
 * Or from hardhat
 * @see https://wagmi.sh/cli/plugins/hardhat
 * Or from an arbitrary fetch request
 * @see https://wagmi.sh/cli/plugins/fetch
 *
 * You can also generate vanilla actions for @wagmi/core
 * @see https://wagmi.sh/cli/plugins/actions
 */
export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    /**
     * Generates react hooks from your forge contracts
     * @see https://wagmi.sh/cli/plugins/foundry
     */
    foundry({
      deployments: {
        AttestationStation: {
          [chains.optimism.id]: ATTESTATION_STATION_ADDRESS,
          [chains.optimismGoerli.id]: ATTESTATION_STATION_ADDRESS,
          [chains.foundry.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //ATTESTATION_STATION_ADDRESS,
        },
        BountiesAttestor: {
          [chains.foundry.id]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        },
      },
    }),
    /**
     * Generates react hooks from your abis
     * @see https://wagmi.sh/cli/plugins/react
     */
    react(),
  ],
});
