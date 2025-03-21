"use client"
import { useState } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`,{
                method: "POST",
                headers:{ "Accept": "application/json",
                          "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch{
            alert("ゆーざ登録NG")
        }
    }

    return (
        <div>
            <h1 className="page-title">user register</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}
                    type="text" name="name" placeholder="なまえ" required/>
                <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                type="text" name="email" placeholder="メールアドレス" required/>
                <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                type="text" name="password" placeholder="パスワード" required/>
                <button>とうろく</button>
            </form>
        </div>
    )
}

export default Register
