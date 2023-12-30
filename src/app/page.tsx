import { Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, Image } from '@chakra-ui/react'
import { fetchData } from '@/services/fetchData'

interface Product {
  id: number
  title: string
  description: string
  image_urls: string[]
  tags: string[]
  price: number
  available: boolean
  createdAt: Date
  updatedAt: Date
}

async function loadProducts () {
  const products = await fetchData("/api/products")
  return products;
}

export default async function Home() {

  const products = await loadProducts()
  return (
    <div className='container mx-auto bg-sky-500'>
      <div className='bg-red-100 mb-2 rounded-md'>
        <Heading as='h1' size='2xl' className='text-center h-min p-2'>
          Bienvenid@ a Boutique Belen
        </Heading>
      </div>
      <main className='bg-gray-200 min-h-[calc(100vh-50px)] rounded-md p-2'>
        <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={[2,6]}>
          {products.VERCEL_ENV || "no"}<br/>
          {products.VERCEL_URL || "no"}<br/>
          {products.VERCEL_BRANCH_URL || "no"}<br/>
          {products.NEXT_PUBLIC_VERCEL_ENV || "no"}<br/>
          {products.NEXT_PUBLIC_VERCEL_URL || "no"}<br/>
          {products.NEXT_PUBLIC_VERCEL_BRANCH_URL || "no"}<br/>
          {products.NODE_ENV}<br/>
          {/* {products.map((p: Product) =>
            <GridItem key={p.id} >
              <Card>
                <CardHeader p={2}>
                  <Heading size='xs' className=''>{p.title}</Heading>
                </CardHeader>
                <CardBody p={2}>
                  <Image src={p.image_urls[0]} alt={p.title} />
                </CardBody>
                {/* <CardFooter p={2}>
                  {p.price}
                </CardFooter>
              </Card>
            </GridItem>  
          )} */}
        </Grid>
      </main>
    </div>

  )
}
