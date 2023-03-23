import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <>
      <h1>OP Starter Project</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}
      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          <Attestooooooor
            receiver="0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
            issuer="Optimism"
            amountUsd={2000}
            event="Scaling Ethereum 2023"
            descritpion="Won Optimism Attestation Bounty"
          />
          <hr />
        </>
      )}
    </>
  );
}
