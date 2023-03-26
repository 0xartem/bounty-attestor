// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import {AttestationStation} from "../src/AttestationStation.sol";
import {BountiesAttestor} from "../src/BountiesAttestor.sol";

/**
 * @title BountiesAttestorScript
 * @notice Script for deploying BountiesAttestor.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy BountiesAttestor with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/AttestationStation.s.sol:BountiesAttestorScript --rpc-url http://localhost:8545 --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract BountiesAttestorScript is Script {
  function run() external {
    // read FORGE_PRIVATE_KEY from environment variables
    uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");
    // start broadcast any transaction after this point will be submitted to chain
    vm.startBroadcast(deployerPrivateKey);

    // Use empty startBroadcast for local deployment
    // vm.startBroadcast();

    // deploy AttestationStation
    AttestationStation attestationStation = new AttestationStation();
    console.log("AttestationStation addr:", address(attestationStation));

    // Hardhat or Foundry key #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
    // deploy BountiesAttestor
    BountiesAttestor bountiesAttestor = new BountiesAttestor(address(0xa0Ee7A142d267C1f36714E4a8F75612F20a79720), attestationStation);
    console.log("BountiesAttestor addr:", address(bountiesAttestor));

    // stop broadcasting transactions
    vm.stopBroadcast();
  }
}