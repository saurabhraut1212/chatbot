import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const {name,email,password}=await req.json();
        if(!name || !email || !password){
            return NextResponse.json({error:"All fields are required"}, {status:400});
        }
        await connectDB();

        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return NextResponse.json({error:"User already exists"}, {status:400});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });

        return NextResponse.json({user,message:"User registered successfully"}, {status:201});
    } catch (error) {
        console.error("Registration Error:",error);
        return NextResponse.json({error:"Internal Server Error"}, {status:500});
    }
}