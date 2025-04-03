import mongoose, { model, models, Schema } from "mongoose";



interface IUser{
    _id?:mongoose.Types.ObjectId;
    name:string;
    email:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date;

}


const UserSchema = new Schema<IUser>(
    {
            name:{type:String, required:true },
            email:{type:String, required:true , unique:true },
            password:{type:String, required:true , unique:true },
    },
    {timestamps:true}
) ;




const  User = models?.User ||model<IUser>("User",UserSchema)

export default User;