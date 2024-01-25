function decodeJWT(token) {
  const parts = token.split(".");

  // Ensure the token has three parts
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const [header, payload, signature] = parts;

  // Decode base64-encoded strings
  const decodedHeader = Buffer.from(header, "base64");
  const decodedPayload = Buffer.from(payload, "base64");

  // Parse JSON
  const parsedHeader = JSON.parse(decodedHeader);
  const parsedPayload = JSON.parse(decodedPayload);

  const email = parsedPayload.email;
  const name = parsedPayload.name;
  const profile = parsedPayload.picture;
  const g_id = parsedPayload.sub;
  return {
    email,
    name,
    profile,
    g_id,
  };
}

export default decodeJWT;
