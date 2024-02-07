import { httpAxios } from "../helper/axiosHelper"

export async function Entry(details:any){
    const result= await httpAxios.post("/",details).then((Response:any)=>Response.data)
    return result
}
