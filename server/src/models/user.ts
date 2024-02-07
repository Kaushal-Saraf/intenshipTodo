import { Document, Schema, model } from "mongoose";
export interface todoDocs extends Document{
    id:number;
    title: string;
    description:string;
    completed: boolean;
    startdate:Date;
    enddate:Date;
}
export interface userDocs extends Document{
    name: string;
    password: string;
    todos: todoDocs[];
}
const UserSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: {type: Array<todoDocs>}
});

  
export const User = model<userDocs>('User', UserSchema);