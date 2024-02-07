import { connect } from "mongoose";

function connects(Mongourl:any){
    return connect(Mongourl).then(()=>{
        console.log("db connected sucessfully...")
    }).catch((error:any)=>{
        console.log("Failed to connect")
        console.log(error)
    })
}
export default connects