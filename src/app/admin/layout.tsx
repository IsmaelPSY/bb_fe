import { ProductProvider } from "@/context/ProductContext"
import { Heading, Link as ChakraLink } from "@chakra-ui/react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Boutique Belen | Admin"
}

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-sky-500 flex p-2 justify-between items-center">
        <Heading fontFamily="appFont" size='lg'>Panel de Administrador</Heading>
        <ul className="flex">
          <li className="bg-sky-300 rounded-lg px-2 py-1 mr-1">
            <ChakraLink as={Link} href="/admin/products">Productos</ChakraLink>
          </li>
        </ul>
      </nav>
      <div className="">
        <ProductProvider>
            {children}
        </ProductProvider>
      </div>
    </>
  )
}