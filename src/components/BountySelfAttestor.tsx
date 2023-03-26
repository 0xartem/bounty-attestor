import { useState } from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import {
  parseString,
  stringifyAttestationBytes,
  createKey,
} from "@eth-optimism/atst";

/**
 * These react hooks are generated with the wagmi cli via `wagmi generate`
 * @see ROOT/wagmi.config.ts
 */
import {
  useAttestationStationAttest,
  usePrepareAttestationStationAttest,
  useAttestationStationAttestations,
} from "../generated";
import {
  createRawKey,
  createRawValue,
  parseRawValue,
} from "../utils/bounty-attestors-utils";
import BountyAttestationCard from "./BountyAttestationCard";
import BountyAttestationCardAction from "./BountyAttestationCardAction";

export const BountySelfAttestor = ({
  event,
  issuer,
  bountyName,
  receiver,
  amountUsd,
  rewardTx,
}: BountyProps) => {
  const { address } = useAccount();

  const rawKey = createRawKey({ event, issuer, bountyName });
  const value = createRawValue({ bountyName, amountUsd, rewardTx });
  // const [value, setValue] = useState<string>(`${amountUsd}.${rewardTx}`);

  const key = createKey(rawKey);
  const newAttestation = stringifyAttestationBytes(value);

  const { config } = usePrepareAttestationStationAttest({
    args: [receiver, key, newAttestation],
  });

  const { data, write } = useAttestationStationAttest({
    ...config,
    // onSuccess: () => setValue(""),
  });

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, receiver, key],
  });
  let onchainBounty: BountyProps | undefined;
  if (attestation && attestation !== "0x") {
    console.log("attestation", attestation);
    const rawStr = parseString(attestation);
    const valueParts = parseRawValue(rawStr);
    onchainBounty = { event, issuer, ...valueParts, receiver };
  }

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <BountyAttestationCardAction
          bounty={{ event, issuer, bountyName, receiver, amountUsd, rewardTx }}
          selfAttestation={true}
          attestationDisabled={!write || isLoading}
          write={write}
        />
        {/* {onchainBounty && (
          <BountyAttestationCard
            bounty={onchainBounty}
            selfAttestation={true}
          />
        )} */}
      </div>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
    </div>
  );
};

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;
  return (
    <span>
      Processing transaction...{" "}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  );
}
