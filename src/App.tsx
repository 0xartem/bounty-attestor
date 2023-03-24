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
      <Header />

      {isConnected && (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
