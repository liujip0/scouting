export async function hashPassword(
  password: string,
  saltToken: string
): Promise<string> {
  const utf8 = new TextEncoder().encode(`${saltToken}:${password}`);
  const hashBuffer = await crypto.subtle.digest({ name: "SHA-256" }, utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
}

export function randomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export function generateSaltToken(): string {
  return randomString(32);
}

export async function generateToken(saltToken: string): Promise<string> {
  return await hashPassword((Math.random() + 1).toString(3), saltToken);
}
