// Generates a human-friendly booking reference, e.g. ECO-7K3F2A.
// Uses an unambiguous Crockford base32 alphabet (no I/O/1/0 confusion).

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateBookingRef(): string {
  let s = "";
  const arr = new Uint32Array(6);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 0xffffffff);
  }
  for (let i = 0; i < 6; i++) s += ALPHABET[arr[i] % ALPHABET.length];
  return `ECO-${s}`;
}
