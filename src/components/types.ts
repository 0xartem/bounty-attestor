interface BountyProps {
  event: string;
  issuer: string;
  bountyName: string;
  receiver: `0x${string}`;
  amountUsd: number;
  rewardTx: string;
}

interface BountyCardProps {
  bounty: BountyProps;
  selfAttestation: boolean;
}
