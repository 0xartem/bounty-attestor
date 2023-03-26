const BountyAttestationCard = ({
  bounty,
  selfAttestation,
}: BountyCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-lg hover:shadow-2xl">
      <figure>
        <img src="/src/assets/bounty-attestor.jpg" alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Bounty Winner
          <div className="badge badge-info">{bounty.event}</div>
        </h2>
        <p>{bounty.bountyName}</p>

        <div className="card-actions justify-end">
          <div className="badge badge-secondary">{bounty.issuer}</div>
          <div className="badge badge-secondary">{bounty.amountUsd} $</div>
        </div>
        <div className="flex justify-end">
          <a
            className="badge badge-outline link tooltip tooltip-left"
            data-tip="Bounty Transaction"
            href={`https://goerli-optimism.etherscan.io/tx/${bounty.rewardTx}`}
            target="_blank"
          >
            {`${bounty.rewardTx.slice(0, 12)}....${bounty.rewardTx.slice(
              bounty.rewardTx.length - 12,
              bounty.rewardTx.length,
            )}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BountyAttestationCard;
