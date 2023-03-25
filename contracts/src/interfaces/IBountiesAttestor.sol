// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IAttestationStation } from "./IAttestationStation.sol";

interface IBountiesAttestor {
    /**
     * @notice Allows an authorized address to create an attestation.
     *
     * @param _about Address that the attestation is about.
     * @param _key   A key used to namespace the attestation.
     * @param _val   An arbitrary value stored as part of the attestation.
     */
    function bountyAttest(
        bytes32 _groupOrIssuer,
        address _about,
        bytes32 _key,
        bytes memory _val
    ) external;

    /**
     * @notice Allows an authorized address to create attestations.
     *
     * @param _attestations An array of attestation data.
     */
    function bountyAttest(bytes32 _groupOrIssuer, IAttestationStation.AttestationData[] calldata _attestations) external;
}