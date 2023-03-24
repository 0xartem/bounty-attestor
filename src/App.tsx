import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";

const App = () => {
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
            event="Scaling Ethereum 2023"
            issuer="Optimism"
            bountyName="$10,000 Hack the Stack - Deploy your OP Stack-Powered Rollup"
            receiver="0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
            amountUsd={2000}
            winnerRank={-1}
            rewardTx={
              "0xf50dd4058be9c65f7831c34a1676ab7f2132436e3e0163b716651006e13a1da6"
            }
          />
          <hr />
        </>
      )}
    </>
  );
};

export default App;
