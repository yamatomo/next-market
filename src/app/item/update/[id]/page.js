"use client"

import { useState, useEffect } from "react"
import { useRouter }  from "next/navigation"
import useAuth from "@/app/utils/useAuth"

const UpdateItem = (context) => {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`,{
                method: "PUT",
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
            alert("item update NG!")
        }
    }

    if(loginUserEmail === email){
        return (
            <div>
                <h1 className="page-title">update item</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e)=>setTtile(e.target.value)} type="text" name="title" placeholder="item name" required />
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" name="price" placeholder="item price" required />
                    <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" name="image" placeholder="item image" required />
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="description" rows={15} placeholder="description"></textarea>
                    <button>update</button>
                </form>
            </div>
        )
    }else{
        return <h1>権限がない！</h1>
    }
}

export default UpdateItem
