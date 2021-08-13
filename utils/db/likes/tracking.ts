import sha256 from "crypto-js/sha256";
import { connectMongo } from "../mongodb";

/**
 * Takes a users IP and returns a unique hash, the IP was concatenated
 * with a secret salt to reduce the likelihood of a rainbow table
 * attack and to make it harder to reverse the hash.
 **/
export const getIpHash = (ip: string): string => {
  const hash = sha256(process.env.HASH_SALT + ip);
  return hash.toString();
};
