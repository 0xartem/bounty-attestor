import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js";

const KECCAK256_STR_SIZE: number = 66;

export const bountyNameToShortId = (bountyName: string) => {
  const bountyNameHash = keccak256(toUtf8Bytes(bountyName));
  console.log(bountyNameHash);
  if (bountyNameHash.length !== KECCAK256_STR_SIZE) {
    throw new Error(`Wrong keccak256 result: ${bountyNameHash}`);
  }
  return bountyNameHash.substring(2, 4);
};
