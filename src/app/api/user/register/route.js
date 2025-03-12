import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function POST(request) {
    const reqBody = await request.json()
    try{
        const { error } = await supabase.from("users").insert(reqBody)
        if(error) throw new Error(error.message)
        return NextResponse.json({message: "user register OK!"})
    }catch(err){
        return NextResponse.json({message: `user register NG! ： ${err}`})
    }
}
