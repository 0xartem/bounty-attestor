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
import { createRawKey, createRawValue } from "../utils/bounty-attestors-utils";

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

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="card w-2/3 bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">New Winner Attestation</h2>
            <p>Current key: {rawKey}</p>
            <p>Current value: {value}</p>
            <p>Current receiver: {receiver}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-accent"
                disabled={!write || isLoading}
                onClick={() => write?.()}
              >
                Attest
              </button>
            </div>
          </div>
        </div>
        <div className="card w-2/3 bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Current Attestation</h2>
            <p>{attestation ? parseString(attestation) : "none"}</p>
          </div>
        </div>
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
