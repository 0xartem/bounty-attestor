import { useState } from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import {
  parseString,
  stringifyAttestationBytes,
  createKey,
} from "@eth-optimism/atst";

import {
  usePrepareBountiesAttestorBountyAttest,
  useAttestationStationAttestations,
  useBountiesAttestorBountyAttest,
  bountiesAttestorAddress,
  useBountiesAttestorIsAuthorized,
} from "../generated";
import {
  createRawKey,
  createRawValue,
  normalizeKeyPart,
} from "../utils/bounty-attestors-utils";

export const BountyAuthAttestor = ({
  event,
  issuer,
  bountyName,
  receiver,
  amountUsd,
  rewardTx,
}: BountyProps) => {
  const { address } = useAccount();
  let authGroupOrIssuer: `0x${string}` | undefined;

  const normalizedEvent = normalizeKeyPart(event);
  const authGroup = createKey(normalizedEvent);
  const { data: authorizedEvent } = useBountiesAttestorIsAuthorized({
    args: [authGroup, address!],
  });

  const normalizedIssuer = normalizeKeyPart(issuer);
  const authIssuer = createKey(normalizedIssuer);
  const { data: authorizedIssuer } = useBountiesAttestorIsAuthorized({
    args: [authIssuer, address!],
  });

  if (authorizedEvent) {
    authGroupOrIssuer = authGroup;
  } else if (authorizedIssuer) {
    authGroupOrIssuer = authIssuer;
  }
  console.log("authGroupOrIssuer", authGroupOrIssuer);

  if (!authGroupOrIssuer) {
    return (
      <div className="card w-2/3 bg-primary text-primary-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Not Authorized</h2>
          <p>
            Current address is not authorized to attest any events or bounties
          </p>
        </div>
      </div>
    );
  }

  const rawKey = createRawKey({ event, issuer, bountyName });
  const value = createRawValue({ bountyName, amountUsd, rewardTx });
  // const [value, setValue] = useState<string>(`${amountUsd}.${rewardTx}`);

  const key = createKey(rawKey);
  const newAttestation = stringifyAttestationBytes(value);

  const { config } = usePrepareBountiesAttestorBountyAttest({
    args: [authGroupOrIssuer, receiver, key, newAttestation],
  });

  const { data, write } = useBountiesAttestorBountyAttest({
    ...config,
    // onSuccess: () => setValue(""),
  });

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [bountiesAttestorAddress[31337], receiver, key],
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
                disabled={!authGroupOrIssuer || !write || isLoading}
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
