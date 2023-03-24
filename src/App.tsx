import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import Header from "./components/header/Header";

const App = () => {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <>
      <h1>Bounty Attestor</h1>

      {/* <Header /> */}
      <ConnectButton />

      {isConnected && (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
