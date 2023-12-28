import { Heading, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-sky-500 flex p-2 justify-between items-center">
        <Heading size='lg'>Panel de Administrador</Heading>
        <ul className="bg-sky-300 rounded-lg px-2 py-1">
          <li>
            <ChakraLink as={Link} href="/admin/products">Productos</ChakraLink>
          </li>
        </ul>
      </nav>
      <div className="">
        {children}
      </div>
    </>
  )
}