const BountyAttestationCardAction = ({
  bounty,
  selfAttestation,
  attestationDisabled,
  write,
}: CreateBountyCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-lg hover:shadow-2xl indicator">
      {!selfAttestation && (
        <span className="indicator-item indicator-center badge badge-info">
          verified
        </span>
      )}
      {selfAttestation && (
        <span className="indicator-item indicator-center badge badge-warning">
          self-attested
        </span>
      )}
      <figure>
        <img src="/src/assets/bounty-attestor.jpg" alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Attestation
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
        <div className="flex justify-end">
          <button
            className="btn btn-accent"
            disabled={attestationDisabled}
            onClick={() => write?.()}
          >
            Attest
          </button>
        </div>
      </div>
    </div>
  );
};

export default BountyAttestationCardAction;
