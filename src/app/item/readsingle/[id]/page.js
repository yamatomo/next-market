import Image from "next/image"
import Link from "next/link"

const getSingleItem = async(id) => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    return singleItem
}

const ReadSingleItem = async(context) => {
    const params = await context.params
    const singleItem = await getSingleItem(params.id)
    return (
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
                <div>
                    <h1>{singleItem.title}</h1>
                    <h2>¥{singleItem.price}</h2>
                    <hr/>
                    <p>{singleItem.description}</p>
                    <div>
                        <Link href={`/item/update/${singleItem.id}`}>item update</Link>
                        <br/>
                        <Link href={`/item/delete/${singleItem.id}`}>item delete</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem
