import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="/src/assets/bounty-attestor.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Bounty Attestor</h1>
          <p className="py-6">
            Bounty Attestor is built with Optimism Attestation Station to
            endorse bounty winners. The winners' addresses can be endorsed by
            the event organizers or bounty issuers - sponsors. If you won a
            bounty you can self-attest your prize, which then allows observers
            to do background check.
          </p>
          <div className="flex flex-row gap-4">
            <NavLink to={"/authorized-attestation"}>
              <button className="btn btn-primary">Attest Winner</button>
            </NavLink>
            <NavLink to={"/self-attestation"}>
              <button className="btn btn-primary">Self Attest</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
