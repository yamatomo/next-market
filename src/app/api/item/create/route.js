import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function POST(request){
    const reqBody = await request.json()
 
    try {
        const { error } = await supabase.from("items").insert(reqBody)
        if(error) throw new Error(error.code)
        return NextResponse.json({message:"あいてむ追加OK"})
    } catch(err) {
        return NextResponse.json({message:`あいてむ追加NG：${err}`})
    }
}
