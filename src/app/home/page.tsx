import { Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, Image, Link as ChakraLink } from '@chakra-ui/react'
import { fetchData } from '@/services/fetchData'
import Link from "next/link"

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
    <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={[2,6]}>
      {products.map((p: Product) =>
        <GridItem key={p.id} >
            <ChakraLink as={Link} href={`/home/product/${p.id}`}>
              <Card>
                <CardHeader p={2}>
                  <Heading size='xs' className=''>{p.title}</Heading>
                </CardHeader>
                <CardBody p={2}>
                  <Image src={p.image_urls[0]} alt={p.title} />
                </CardBody>
                {/* <CardFooter p={2}>
                  {p.price}
                </CardFooter> */}
              </Card>
            </ChakraLink>
        </GridItem>  
      )}
    </Grid>
  )
}
