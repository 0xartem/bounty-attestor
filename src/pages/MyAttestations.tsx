import { createKey, parseString } from "@eth-optimism/atst";
import { useLoaderData } from "react-router-dom";
import { useAccount, useNetwork } from "wagmi";
import BountyAttestationCard from "../components/BountyAttestationCard";
import {
  bountiesAttestorAddress,
  useAttestationStationAttestations,
} from "../generated";
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

  const { chain } = useNetwork();
  const { address } = useAccount();

  const bountyCards: BountyCardProps[] = [];
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
          console.log("attestation self", attestation);
          const rawStr = parseString(attestation);
          const valueParts = parseRawValue(rawStr);
          bountyCards.push({
            bounty: { ...keyParts, ...valueParts, receiver: address! },
            selfAttestation: true,
          });
        }
      });
    });
  });

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
          args: [
            bountiesAttestorAddress[
              chain?.id as keyof typeof bountiesAttestorAddress
            ],
            address!,
            key,
          ],
        });
        if (attestation && attestation !== "0x") {
          console.log("attestation auth", attestation);
          const rawStr = parseString(attestation);
          const valueParts = parseRawValue(rawStr);
          bountyCards.push({
            bounty: { ...keyParts, ...valueParts, receiver: address! },
            selfAttestation: false,
          });
        }
      });
    });
  });

  console.log("bounties", bountyCards);

  return (
    <div className="flex flex-col gap-10 items-center mt-10">
      {bountyCards.map((bountyCard) => (
        <BountyAttestationCard
          bounty={bountyCard.bounty}
          selfAttestation={bountyCard.selfAttestation}
        />
      ))}
    </div>
  );
};

export default MyAttestations;
