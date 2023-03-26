import { NavLink } from "react-router-dom";
import bountyAttestor from "../../assets/bounty-attestor.jpg";

const NavBar = () => {
  const evaluateNavLinkClass = ({ isActive }: any) =>
    isActive
      ? "bg-secondary-focus hover:text-accent active:bg-neutral rounded-md p-3"
      : "hover:text-accent active:bg-neutral rounded-md p-3";
  return (
    <nav className="flex gap-6">
      <NavLink to={"/"}>
        <img
          className="rounded-3xl w-12 h-12"
          src={bountyAttestor}
          alt="Bounty Attestor"
        />
      </NavLink>
      <NavLink className={evaluateNavLinkClass} to={"/my-attestations"}>
        My Attestations
      </NavLink>
      <NavLink className={evaluateNavLinkClass} to={"/authorized-attestation"}>
        Attest Winner
      </NavLink>
      <NavLink className={evaluateNavLinkClass} to={"/self-attestation"}>
        Self Attest
      </NavLink>
    </nav>
  );
};

export default NavBar;
