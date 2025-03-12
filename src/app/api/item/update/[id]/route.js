import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function PUT(request,context) {
    const reqBody = await request.json()
    const params = await context.params
    console.log(`koko : ${params.id}`)
    try{
        const { data, error } = await supabase.from("items").select().eq("id", params.id).single()
        if(error) throw new Error(error.message)
        console.log("koko1")
        if(data.email === reqBody.email){
            const { error } = await supabase.from("items").update(reqBody).eq("id", params.id)
            if(error) throw new Error(error.message)
            return NextResponse.json({message: "item update OK!"})
        }else{
            return NextResponse.json({message: "item update NG! : not id"})
        }
    }catch(err){
        return NextResponse.json({message: `item update NG! ： ${err}`})
    }
}