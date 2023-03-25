// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IBountiesAttestor } from "./interfaces/IBountiesAttestor.sol";
import { IBountiesAccessControl } from "./interfaces/IBountiesAccessControl.sol";
import { IAttestationStation } from "./interfaces/IAttestationStation.sol";


contract BountiesAttestor is IBountiesAttestor, IBountiesAccessControl {

    mapping(bytes32 => mapping(address => bool)) groupAccounts;
    mapping(bytes32 => mapping(address => bool)) issuersAccounts;

    address public globalAdmin;
    IAttestationStation public attestationStation;

    constructor(address _globalAdmin, IAttestationStation _attestationStatoin) {
      globalAdmin = _globalAdmin;
      attestationStation = IAttestationStation(_attestationStatoin);
    }

    function authorizeBountyGroupAccount(bytes32 group, address account) external {
      groupAccounts[group][account] = true;
    }

    function revokeBountyGroupAccount(bytes32 group, address account) external {
      groupAccounts[group][account] = false;
    }

    function authorizeBountyIssuerAccount(bytes32 issuer, address account) external {
      issuersAccounts[issuer][account] = true;
    }

    function revokeBountyIssuerAccount(bytes32 issuer, address account) external {
      issuersAccounts[issuer][account] = false;
    }

    function isAuthorized(bytes32 _groupOrIssuer, address account) external view returns (bool) {
      return isAuthorizedInternal(_groupOrIssuer, account);
    }

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
    ) external {
      if (!isAuthorizedInternal(_groupOrIssuer, msg.sender))
          revert AddressNotAuthorized();

      IAttestationStation.AttestationData[] memory attestations = new IAttestationStation.AttestationData[](1);
      attestations[0] = IAttestationStation.AttestationData({
              about: _about,key: _key, val: _val
      });
      attestationStation.attest(attestations);
    }

    /**
     * @notice Allows an authorized address to create attestations.
     *
     * @param _attestations An array of attestation data.
     */
    function bountyAttest(bytes32 _groupOrIssuer, IAttestationStation.AttestationData[] calldata _attestations) external {
      if (!isAuthorizedInternal(_groupOrIssuer, msg.sender))
          revert AddressNotAuthorized();
      attestationStation.attest(_attestations);
    }

    function isAuthorizedInternal(bytes32 _groupOrIssuer, address account) internal view returns (bool) {
      return account == globalAdmin || groupAccounts[_groupOrIssuer][account] || issuersAccounts[_groupOrIssuer][account];
    }
}