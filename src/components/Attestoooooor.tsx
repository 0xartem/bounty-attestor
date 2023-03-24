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
import { bountyNameToShortId } from "../utils/bounty-attestors-utils";

/**
 * An example component using the attestation station
 */

interface Props {
  event: string;
  issuer: string;
  bountyName: string;
  receiver: `0x${string}`;
  amountUsd: number;
  winnerRank: number;
  rewardTx: string;
}

export function Attestooooooor({
  event,
  issuer,
  bountyName,
  receiver,
  amountUsd,
  winnerRank,
  rewardTx,
}: Props) {
  const { address } = useAccount();

  const bountyNameId = bountyNameToShortId(bountyName);

  const rawKey = `bounty.winner.${event.replace(/\s/g, "")}.${issuer.replace(
    /\s/g,
    "",
  )}.${bountyNameId}`;
  const [value, setValue] = useState<string>(
    `${amountUsd}.${winnerRank}.${rewardTx}`,
  );

  const key = createKey(rawKey);
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
      <div>Current key: {rawKey}</div>
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
