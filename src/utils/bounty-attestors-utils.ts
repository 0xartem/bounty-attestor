import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js";

const KECCAK256_STR_SIZE: number = 66;

export const bountyNameToShortId = (bountyName: string) => {
  const bountyNameHash = keccak256(toUtf8Bytes(bountyName));
  if (bountyNameHash.length !== KECCAK256_STR_SIZE) {
    throw new Error(`Wrong keccak256 result: ${bountyNameHash}`);
  }
  return bountyNameHash.substring(2, 6);
};

export const normalizeKeyPart = (part: string) => {
  return part.replace(/\s/g, "").toLowerCase();
};

export const createRawKey = (
  event: string,
  issuer: string,
  bountyName: string,
) => {
  const bountyNameId = bountyNameToShortId(bountyName);
  return `bounty.winner.${normalizeKeyPart(event)}.${normalizeKeyPart(
    issuer,
  )}.${bountyNameId}`;
};
