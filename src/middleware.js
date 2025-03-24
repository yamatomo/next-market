import { NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose";

export async function middleware(request) {
    console.log("middle")
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inpha2kzQGdtYWlsLmNvbSIsImV4cCI6MTc0MTg0Mjc4OX0.C1q6bnvsVBto0Pds3wCD2wewHiVibP-UgwUePyEiQRw"
    if(!token){
        return NextResponse.json({message: "not token"})
    }

    try{
        const secretKey = new TextEncoder().encode("next-market")
        const decodedjwt = await jwtVerify(token, secretKey)
        return NextResponse.next()
    }catch{
        return NextResponse.json({message: "miss match token, login"})
    }
}

export const config = {
    matcher: ["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*",],
}
