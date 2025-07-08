import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"}
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password are required");
                }

                await connectDB();
                const user=await User.findOne({email:credentials.email});
                if(!user){
                    throw new Error("No user found with this email");
                }
                const isPasswordValid=await bcrypt.compare(credentials.password, user.password);
                if(!isPasswordValid){
                    throw new Error("Invalid password");
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                };
            }
        })
    ],
    pages:{
        signIn:'/login'
    },
    session:{
        strategy:"jwt",
    },
   callbacks: {
   async session({ session, token }) {
    if (token?.sub && session?.user) {
      session.user.id = token.sub;
    }
    return session;
  },
   async redirect({  baseUrl }) {
    return baseUrl + "/";
  },
}
,
    secret: process.env.NEXTAUTH_SECRET,
})
export { handler as GET, handler as POST };