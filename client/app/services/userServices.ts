import { httpAxios } from "../helper/axiosHelper"

export async function Entry(details:any){
    const result= await httpAxios.post("/",details).then((Response:any)=>Response.data)
    return result
}
export async function addTodo(id:string, details:any){
    const result= await httpAxios.post(`/${id}`,details).then((Response:any)=>Response.data)
    return result
}
export async function getDetails(id:string){
    const result= await httpAxios.get(`/${id}`).then((Response:any)=>Response.data)
    return result
}