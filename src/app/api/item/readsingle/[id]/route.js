import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function GET(request,context) {
    const params = await context.params
    try{
        const { data, error } = await supabase.from("items").select().eq("id", params.id).single()
        if(error) throw new Error(error.message)
        return NextResponse.json({message: "item single OK!", singleItem: data})
    }catch(err){
        return NextResponse.json({message: `item single NG! ： ${err}`})
    }
}