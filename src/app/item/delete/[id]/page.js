"use client"

import { useState, useEffect } from "react"
import { useRouter }  from "next/navigation"
import Image from "next/image"
import useAuth from "@/app/utils/useAuth"

const DeleteItem = (context) => {
    const [title, setTtile] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async() => {
            const params = await context.params
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`)
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            setTtile(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }
        getSingleItem()
    },[context])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const params = await context.params
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`,{
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
        }catch{
            alert("item delete NG!")
        }
    }

    if(loginUserEmail === email){
        return (
            <div>
                <h1 className="page-title">delete item</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} width={750} height={500} alt="item-image" priority />
                    <h3>¥{price}</h3>
                    <p>{description}</p>
                    <button>delete</button>
                </form>
            </div>
        )
    }else{
        return <h1>権限がない！</h1>
    }
}

export default DeleteItem
