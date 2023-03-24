import NavBar from "./NavBar";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <>
      <h1 className="text-center">Bounty Attestor</h1>
      <header className="flex justify-between p-5">
        <NavBar />
        <ConnectButton />
      </header>
    </>
  );
};

export default Header;
