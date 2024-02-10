import jose from 'node-jose';

async function setUser(payload:string , key:string) {
    const keystore = jose.JWK.createKeyStore();
    const signingKey = await keystore.generate('oct', 256, { use: 'sig', k: key });
    const token = await jose.JWS.createSign({ format: 'compact' }, signingKey)
    .update(JSON.stringify(payload))
    .final();
    return token;
  }

export{
    setUser,
}