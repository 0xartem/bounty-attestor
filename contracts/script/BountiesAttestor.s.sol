// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import {AttestationStation} from "../src/AttestationStation.sol";
import {BountiesAttestor} from "../src/BountiesAttestor.sol";

/**
 * @title BountiesAttestorScriptDeployLocal
 * @notice Script for deploying BountiesAttestor.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy BountiesAttestor with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/BountiesAttestor.s.sol:BountiesAttestorScriptDeployLocal --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract BountiesAttestorScriptDeployLocal is Script {
  function run() external {
    // read BOUNTIES_ATTESTOR_LOCAL_ADMIN with ultimate admin rights from environment variables
    // Default is Hardhat or Foundry key #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
    address globalAdmin = vm.envAddress("BOUNTIES_ATTESTOR_LOCAL_ADMIN");
    console.log("Bounties Admin:", globalAdmin);

    // Use empty startBroadcast for local deployment
    // --private-key is provided in the command line
    vm.startBroadcast();

    // deploy AttestationStation
    AttestationStation attestationStation = new AttestationStation();
    console.log("AttestationStation Address:", address(attestationStation));

    // deploy BountiesAttestor
    BountiesAttestor bountiesAttestor = new BountiesAttestor(globalAdmin, attestationStation);
    console.log("BountiesAttestor Address:", address(bountiesAttestor));

    // stop broadcasting transactions
    vm.stopBroadcast();
  }
}

/**
 * @title BountiesAttestorScriptDeployLive
 * @notice Script for deploying BountiesAttestor.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy BountiesAttestor with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/BountiesAttestor.s.sol:BountiesAttestorScriptDeployLive --rpc-url $FORGE_RPC_URL --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract BountiesAttestorScriptDeployLive is Script {
  function run() external {
    // read FORGE_PRIVATE_KEY from environment variables
    uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

    // read BOUNTIES_ATTESTOR_ADMIN with ultimate admin rights from environment variables
    address globalAdmin = vm.envAddress("BOUNTIES_ATTESTOR_ADMIN");
    console.log("Bounties Admin:", globalAdmin);

    // start broadcast any transaction after this point will be submitted to chain
    vm.startBroadcast(deployerPrivateKey);

    // Initialize AttestationStation with the deployed official contract
    AttestationStation attestationStation = AttestationStation(0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77);
    // deploy BountiesAttestor
    BountiesAttestor bountiesAttestor = new BountiesAttestor(globalAdmin, attestationStation);
    console.log("BountiesAttestor Address:", address(bountiesAttestor));

    // stop broadcasting transactions
    vm.stopBroadcast();
  }
}