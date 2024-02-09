import { httpAxios } from "../helper/axiosHelper"

export async function Entry(details:any){
    const result= await httpAxios.post("/",details).then((Response:any)=>Response.data)
    return result
}
export async function getDetails(id:string){
    const result= await httpAxios.get(`/${id}`).then((Response:any)=>Response.data)
    return result
}
export async function addTodo(id:string, details:any){
    const result= await httpAxios.post(`/${id}`,details).then((Response:any)=>Response.data)
    return result
}
export async function sortByEndDate(id:string){
    const result= await httpAxios.patch(`/${id}`).then((Response:any)=>Response.data)
    return result 
}
export async function deleteCompletedTodo(id:string){
    const result= await httpAxios.delete(`/${id}`).then((Response:any)=>Response.data)
    return result
}
export async function markAsCompleted(id:string,ids:any){
    const result= await httpAxios.patch(`/${id}/markAsCompleted`,ids).then((Response:any)=>Response.data)
    return result
}
export async function deleteSelectedIds(id:string,ids:any){
    const result= await httpAxios.patch(`/${id}/deleteTodo`,ids).then((Response:any)=>Response.data)
    return result
}

