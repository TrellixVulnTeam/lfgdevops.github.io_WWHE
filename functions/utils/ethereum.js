async function verifySignature() {
  let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);
}
