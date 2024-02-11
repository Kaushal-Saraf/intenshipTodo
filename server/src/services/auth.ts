import jwt from "jsonwebtoken"

async function setUser(payload:string , key:string) {
   const token = jwt.sign(payload,key)
   return token;
}

async function getUser(token:string, key:string) {
  const payload = jwt.verify(token,key);
  return payload
  
}
export{
    setUser,
    getUser,
}