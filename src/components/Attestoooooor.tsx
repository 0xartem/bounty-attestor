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

/**
 * An example component using the attestation station
 */

interface Props {
  receiver: `0x${string}`;
  issuer: string;
  amountUsd: number;
  event: string;
  descritpion?: string;
}

export function Attestooooooor({
  receiver,
  issuer,
  amountUsd,
  event,
  descritpion,
}: Props) {
  console.log(
    `receiver ${receiver}; issuer: ${issuer}; amountUsd: ${amountUsd}; event: ${event}`,
  );
  const { address } = useAccount();
  const [value, setValue] = useState<string>(`${issuer}:${amountUsd}`);

  const key = createKey(`bounty.winner.${event}`);
  const newAttestation = stringifyAttestationBytes(value);

  const { config } = usePrepareAttestationStationAttest({
    args: [receiver, key, newAttestation],
  });

  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => setValue(""),
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
      <h2>Attestoooooor</h2>
      <div>
        Current attestation: {attestation ? parseString(attestation) : "none"}
      </div>
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Attest
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      <div>
        Gas fee: <span>{config.request?.gasLimit.toString()}</span>
      </div>
    </div>
  );
}

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
