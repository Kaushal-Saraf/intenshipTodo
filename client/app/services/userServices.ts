import { httpAxios } from "../helper/axiosHelper"

export async function enterCredentials(details:any){
    const result= await httpAxios.post("/",details,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function getHome(){
    const result= await httpAxios.post("/",{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function getDetails(id:string){
    const result= await httpAxios.get(`/${id}`,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function addTodo(id:string, details:any){
    const result= await httpAxios.post(`/${id}`,details,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function sortByEndDate(id:string){
    const result= await httpAxios.patch(`/${id}`,{withCredentials: true}).then((Response:any)=>Response.data)
    return result 
}
export async function deleteCompletedTodo(id:string){
    const result= await httpAxios.delete(`/${id}`,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function markAsCompleted(id:string,ids:any){
    const result= await httpAxios.patch(`/${id}/markAsCompleted`,ids,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}
export async function deleteSelectedIds(id:string,ids:any){
    const result= await httpAxios.patch(`/${id}/deleteTodo`,ids,{withCredentials: true}).then((Response:any)=>Response.data)
    return result
}

