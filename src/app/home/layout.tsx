import CProductFilter from "@/components/CProductFilter"
import { Heading } from "@chakra-ui/react"

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return(
    <div className='container mx-auto bg-sky-500'>
      <div className='bg-red-100 mb-2 rounded-b-md'>
        <Heading as='h1' size={['xl', '2xl']} className='text-center h-min p-2'>
          Bienvenid@ a Boutique Belen
        </Heading>
      </div>
      <div className='bg-red-100 mb-2 rounded-md'>
        <CProductFilter />
      </div>
      <main className='bg-gray-200 min-h-[calc(100vh-50px)] rounded-md p-2'>
        { children} 
      </main>
    </div>
  )
}