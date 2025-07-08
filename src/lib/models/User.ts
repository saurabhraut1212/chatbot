import  {Document,Schema,models,model} from "mongoose";

export interface IUser extends Document{
    name: string;
    email:string;
    password?:string;
}


const userSchema=new Schema<IUser>({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String},
})

export const User=models.user || model<IUser>("user",userSchema);
