import { Grid, Heading } from "@chakra-ui/react"

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return(
    <div className='container mx-auto bg-sky-500'>
        <Heading 
          as='h1' 
          size={['md', '2xl']} 
          className='text-center h-min p-2 bg-pink-200 mb-2 rounded-b-md'
          fontFamily="appFont"
        >
          Boutique Belen
        </Heading>
        {/* <CProductFilter /> */}
      <main className='bg-gray-200 min-h-[calc(100vh-50px)] rounded-md p-2'>
        { children} 
      </main>
    </div>
  )
}