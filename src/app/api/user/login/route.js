import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import supabase from "@/app/utils/database";

export async function POST(request) {
    const reqBody = await request.json()
    try{
        const { data, error } = await supabase.from("users").select().eq("email", reqBody.email).single()
        console.log(data)
        if(!error){
            if(reqBody.password === data.password)
            {
                const secretKey = new TextEncoder().encode("next-market")
                const payload = { email: reqBody.email, }
                const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey)
                console.log(token)
                return NextResponse.json({message: "user login OK!", token: token})
            }else{
                return NextResponse.json({message: "user login NG! : The password is incorrect"})
            }
        }else{
            return NextResponse.json({message: "user login NG! : not registered"})
        }
    }catch(err){
        return NextResponse.json({message: `user login NG! ： ${err}`})
    }
}
