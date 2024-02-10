import jose from 'node-jose';
export async function getUser(token:string, key:string){
    const keystore = jose.JWK.createKeyStore();
    const verifyingKey = await keystore.generate('oct', 256, { use: 'sig', k: key });
    const result = await jose.JWS.createVerify(verifyingKey)
    .verify(token);
    return result.payload.toString();
}
  
export async function verifyToken(token:string, key:any) {
    const keystore = jose.JWK.createKeyStore();
    const verifyingKey = await keystore.generate('oct', 256, { use: 'sig', k: key });
  
    const result = await jose.JWS.createVerify(verifyingKey)
      .verify(token);
  
    return result.payload.toString();
  }
  