import { ProductProvider } from "@/context/ProductContext"
import { TagProvider } from "@/context/TagContext"
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
        <ul className="flex">
          <li className="bg-sky-300 rounded-lg px-2 py-1 mr-1">
            <ChakraLink as={Link} href="/admin/products">Productos</ChakraLink>
          </li>
          <li className="bg-sky-300 rounded-lg px-2 py-1">
            <ChakraLink as={Link} href="/admin/tags">Etiquetas</ChakraLink>
          </li>
        </ul>
      </nav>
      <div className="">
        <ProductProvider>
          <TagProvider>
            {children}
          </TagProvider>
        </ProductProvider>
      </div>
    </>
  )
}