import { createKey, parseString } from "@eth-optimism/atst";
import { useLoaderData } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAttestationStationAttestations } from "../generated";
import { createRawKey, parseRawValue } from "../utils/bounty-attestors-utils";

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

const MyAttestations = () => {
  const data = useLoaderData() as EventInfo[];
  console.log("Data", data);

  const { address } = useAccount();

  const bounties: BountyCardProps[] = [];
  data.map((event) => {
    event.issuers.map((issuer) => {
      issuer.bountyNames.map((bountyName) => {
        const keyParts = {
          event: event.event,
          issuer: issuer.name,
          bountyName,
        };
        const rawKey = createRawKey(keyParts);
        const key = createKey(rawKey);
        const { data: attestation } = useAttestationStationAttestations({
          args: [address!, address!, key],
        });
        if (attestation && attestation !== "0x") {
          console.log("attestation", attestation);
          const rawStr = parseString(attestation);
          const valueParts = parseRawValue(rawStr);
          bounties.push({
            bounty: { ...keyParts, ...valueParts, receiver: address! },
            selfAttestation: true,
          });
        }
      });
    });
  });

  console.log("bounties", bounties);

  return (
    <div className="flex flex-col">
      {bounties.map((bounty) => (
        <div className="card w-2/3 bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Current Attestation</h2>
            <p>{JSON.stringify(bounty)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAttestations;
