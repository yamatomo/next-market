import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function GET() {
    try{
        const { data, error } = await supabase.from("items").select().order("created_at", {ascending: true})
        if(error) throw new Error(error.message)
        return NextResponse.json({message: "item all OK!", allItems: data})
    }catch(err){
        return NextResponse.json({message: `item all NG! ：${err}`})
    }
}

export const revalidate = 0
