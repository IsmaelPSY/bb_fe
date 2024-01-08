import { Grid, GridItem } from '@chakra-ui/react'
import { getAllProducts } from '@/services/fetchData'
import CProductCard from '@/components/CProductCard'

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
  const products = await getAllProducts()
  return products;
}

export default async function Home() {

  const products = await loadProducts()
  
  return (
    <Grid templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={[2,6]}>
      {products.map((p: Product) =>
        <GridItem key={p.id}>
          <CProductCard product={p} />
        </GridItem>  
      )}
    </Grid>
  )
}
