import { NavLink } from "react-router-dom";

const NavBar = () => {
  const evaluateNavLinkClass = ({ isActive }: any) =>
    isActive
      ? "bg-secondary-focus hover:text-accent active:bg-neutral rounded-md p-2"
      : "hover:text-accent active:bg-neutral rounded-md p-2";
  return (
    <nav className="flex gap-6">
      <NavLink className={evaluateNavLinkClass} to={"/home"}>
        Home
      </NavLink>
      <NavLink className={evaluateNavLinkClass} to={"/authorized-attestation"}>
        Authorized Attestation
      </NavLink>
      <NavLink className={evaluateNavLinkClass} to={"/self-attestation"}>
        Self Attestation
      </NavLink>
    </nav>
  );
};

export default NavBar;
