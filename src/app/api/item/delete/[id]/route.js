import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function DELETE(request,context) {
    const reqBody = await request.json()
    const params = await context.params
    try{
        const { data, error } = await supabase.from("items").select().eq("id", params.id).single()
        if(error) throw new Error(error.message)
        if(data.email === reqBody.email){
            const { error } = await supabase.from("items").delete().eq("id", params.id)
            if(error) throw new Error(error.message)
            return NextResponse.json({message: "item delete OK!"})
        }else{
            return NextResponse.json({message: "item delete NG! : not id"})
        }
    }catch(err){
        return NextResponse.json({message: `item delete NG! ： ${err}`})
    }
}