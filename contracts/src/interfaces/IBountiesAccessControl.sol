// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IBountiesAccessControl {

    error AddressNotAuthorized();

    function authorizeBountyGroupAccount(bytes32 group, address account) external;
    function revokeBountyGroupAccount(bytes32 group, address account) external;

    function authorizeBountyIssuerAccount(bytes32 issuer, address account) external;
    function revokeBountyIssuerAccount(bytes32 issuer, address account) external;

    function isAuthorized(bytes32 _groupOrIssuer, address account) external view returns (bool);
}