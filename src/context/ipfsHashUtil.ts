// Função utilitária para gerar um hash único (simulando IPFS) baseado nos dados do pet
export async function generatePetHash(data: Record<string, string | undefined>): Promise<string> {
  const encoder = new TextEncoder();
  const str = Object.values(data).join('-');
  const buffer = encoder.encode(str);
  // Usa o Web Crypto API para gerar SHA-256
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // Simula um CID IPFS (Qm...)
  return `Qm${hashHex.slice(0, 44)}`;
}
