import NavBar from "./NavBar";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <>
      <header className="flex justify-between p-5">
        <NavBar />
        <ConnectButton />
      </header>
    </>
  );
};

export default Header;
