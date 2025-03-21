import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <div>
                <Link href="/">
                    <Image src="/header.svg" width={1330} height={148} alt="header-image" priority />
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/user/register">とうろく</Link></li>
                    <li><Link href="/user/login">ろぐいん</Link></li>
                    <li><Link href="/item/create">item create</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
