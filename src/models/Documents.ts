import mongoose ,{model,models,Schema} from "mongoose";

interface IDoc {
    _id:mongoose.Types.ObjectId,
title:string,
content:string,
ownerId:string,
collaboratorIds?:[string],
roomId?:string,
organizationId?:string,
createdAt?:Date;
updatedAt?:Date;

}


const DocumnetSchema = new Schema<IDoc>(
    {
        title:{type:String, required:true },
        content:{type:String, required:true },
        collaboratorIds:[{type:String}],
        ownerId:{type:String},
        roomId:{type:String},
        organizationId:{type:String},
    },
    {timestamps:true}
);


const Document = models?.Document || model<IDoc>("Document",DocumnetSchema)

export default Document