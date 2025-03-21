"use client"

import { useState } from "react"
import { useRouter }  from "next/navigation"
import useAuth from "@/app/utils/useAuth"

const CreateItem = () => {
    const [title, setTtile] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/item/create",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
        }catch{
            alert("item create NG!")
        }
    }

    if(loginUserEmail){
        return (
            <div>
                <h1 className="page-title">create item</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e)=>setTtile(e.target.value)} type="text" name="title" placeholder="item name" required />
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" name="price" placeholder="item price" required />
                    <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" name="image" placeholder="item image" required />
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="description" rows={15} placeholder="description"></textarea>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

export default CreateItem
