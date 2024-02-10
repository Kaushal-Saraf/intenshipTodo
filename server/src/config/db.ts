import { connect } from "mongoose";

function connects(Mongourl:string|null){
    if(Mongourl===null){
        return "Unable to connect due to wrong url"
    }
    return connect(Mongourl).then(()=>{
        console.log("db connected sucessfully...")
    }).catch((error)=>{
        console.log("Failed to connect")
        console.log(error)
    })
}
export default connects