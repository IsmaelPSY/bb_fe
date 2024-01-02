"use client"

import { Button, Card, CardBody, CardHeader, Center, Flex, Heading, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useState } from "react"

interface Product {
  id?: number
  title: string
  description: string
  image_urls: string[]
  tags: string[]
  price: number
  available: boolean
  createdAt?: Date
  updatedAt?: Date
}

export default function CProductCard ({ product }: {product: Product}) {

  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <Card onClick={() => setIsOpen(true)}>
        <CardHeader p={2}>
          <Heading size='xs' className='uppercase'>{product.title}</Heading>
        </CardHeader>
        <CardBody p={2}>
          <Image src={product.image_urls[0]} alt={product.title} />
        </CardBody>
        {/* <CardFooter p={2}>
          {p.price}
        </CardFooter> */}
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between">
              <Heading size='xs' className='uppercase'>{product.title}</Heading>
              <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Image src={product.image_urls[0]} alt={product.title} />
          </ModalBody>
          <ModalFooter>
            <Center>
              {product.tags}
            </Center>
            <Flex>

              <Text>
                {product.description}
              </Text>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}