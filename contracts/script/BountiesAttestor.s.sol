// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import {AttestationStation} from "../src/AttestationStation.sol";
import {BountiesAttestor} from "../src/BountiesAttestor.sol";

contract BountiesAttestorScript is Script {
  function run() external {
    uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    // Use empty startBroadcast for local deployment
    // vm.startBroadcast();

    AttestationStation attestationStation = new AttestationStation();
    console.log("AttestationStation addr:", address(attestationStation));

    BountiesAttestor bountiesAttestor = new BountiesAttestor(address(0xa0Ee7A142d267C1f36714E4a8F75612F20a79720), attestationStation);
    console.log("BountiesAttestor addr:", address(bountiesAttestor));

    vm.stopBroadcast();
  }
}