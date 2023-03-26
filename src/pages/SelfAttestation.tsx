import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useAccount } from "wagmi";
import { BountySelfAttestor } from "../components";

interface EventInfo {
  event: string;
  issuers: [{ name: string; bountyNames: string[] }];
}

export const loader = async () => {
  return [
    {
      event: "ETH Denver 2023",
      issuers: [
        {
          name: "OPLabs",
          bountyNames: [
            "Create a Developer Tool for the AttestationStation",
            "Create an AttestationStation Visualization",
            "Create an AttestationStation App",
          ],
        },
      ],
    },
    {
      event: "Scaling Ethereum 2023",
      issuers: [
        {
          name: "Optimism",
          bountyNames: [
            "$10,000 Hack the Stack – Deploy your OP Stack-Powered Rollup",
            "$6,000 Great Attestations – Identity & Reputation Bounty",
            "$4,000 Pool Prize – Deploy on Optimism Mainnet",
          ],
        },
      ],
    },
  ] as EventInfo[];
};

const SelfAttestation = () => {
  const data = useLoaderData() as EventInfo[];
  console.log("Data", data);

  const { address } = useAccount();

  const [event, setEvent] = useState<string>("unknown");
  const [issuer, setIssuer] = useState<string>("unknown");
  const [bountyName, setBountyName] = useState<string>("unknown");
  const [prize, setPrize] = useState<number>(0);
  const [rewardTx, setRewardTx] = useState<`0x${string}`>(
    "0xf50dd4058be9c65f7831c34a1676ab7f2132436e3e0163b716651006e13a1da6",
  );

  return (
    <>
      <Form method="post">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Choose event</span>
          </label>
          <div className="input-group">
            <span>Event</span>
            <select
              className="select select-bordered"
              onChange={(e) => setEvent(e.target.value)}
            >
              <option disabled selected>
                Event Name
              </option>
              {data.map((item) => (
                <option>{item.event}</option>
              ))}
            </select>
          </div>
          <label className="label">
            <span className="label-text">Choose issuer</span>
          </label>
          <div className="input-group">
            <span>Issuer</span>
            <select
              className="select select-bordered"
              onChange={(e) => setIssuer(e.target.value)}
            >
              <option disabled selected>
                Issuer Name
              </option>
              {data
                .find((val) => val.event === event)
                ?.issuers.map((issuer) => (
                  <option>{issuer.name}</option>
                ))}
            </select>
          </div>
          <label className="label">
            <span className="label-text">Choose bounty</span>
          </label>
          <div className="input-group">
            <span>Bounty</span>
            <select
              className="select select-bordered"
              onChange={(e) => setBountyName(e.target.value)}
            >
              <option disabled selected>
                Bounty Name
              </option>
              {data
                .find((val) => val.event === event)
                ?.issuers.find((val) => val.name === issuer)
                ?.bountyNames.map((bountyName) => (
                  <option>{bountyName}</option>
                ))}
            </select>
          </div>
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group">
            <span>Prize</span>
            <input
              type="number"
              id="prize-amount"
              placeholder="1000"
              className="input input-bordered"
              onChange={(e) => setPrize(e.target.value as unknown as number)}
            />
            <span>$</span>
          </label>
          <label className="label">
            <span className="label-text">Enter reward transaction</span>
          </label>
          <label className="input-group">
            <span>Transaction</span>
            <input
              type="text"
              id="rewardTx"
              placeholder="0x..."
              defaultValue={rewardTx}
              className="input input-bordered"
              onChange={(e) => setRewardTx(e.target.value as `0x${string}`)}
            />
          </label>
        </div>
      </Form>
      <hr />
      <BountySelfAttestor
        event={event}
        issuer={issuer}
        bountyName={bountyName}
        receiver={address!}
        amountUsd={prize}
        rewardTx={rewardTx}
      />
      <hr />
    </>
  );
};

export default SelfAttestation;
