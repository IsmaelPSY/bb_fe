"use client"

import { IProduct } from "@/interfaces/IProduct"
import { 
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text 
} from "@chakra-ui/react"

import { useState } from "react"
import CProductTag from "./CProductTag"


export default function CProductCard ({ product }: {product: IProduct}) {

  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <Card onClick={() => setIsOpen(true)} className="cursor-pointer">
        <CardHeader p={2}>
          <Grid templateColumns='repeat(2, auto)' alignItems="center">
            <Heading size={['sm', 'md']}>{product.title}</Heading>
            <Badge 
              variant="outline" 
              textAlign="center"
              borderRadius="5"
              fontSize={['sm','md']}
            >
              S/{product.price}
            </Badge>
          </Grid>
        </CardHeader>
        <CardBody p={2}>
          <Image borderRadius="5" src={product.image_urls[0]} alt={product.title} />
        </CardBody>
        <CardFooter p={2}>
          <Text fontSize="sm">
            {product.description}
          </Text>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between">
              <Heading size={['md', 'md']}>{product.title}</Heading>
              <Button onClick={() => setIsOpen(false)} size="sm">Cerrar</Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Image borderRadius="5" src={product.image_urls[0]} alt={product.title} />
          </ModalBody>
          <ModalFooter>
            <Flex direction="column" gap="2">
              <Flex gap={2} align="center" alignItems="start">
                <Flex gap={2} wrap="wrap">
                  {
                    Number.isInteger(product.size)
                    ? <CProductTag value={product.size} type="size"/>
                    : null
                  }
                  {
                    product.gender
                  ? <CProductTag value={product.gender} type="gender"/>
                    : null
                  }
                  {
                    product.category
                  ? <CProductTag value={product.category} type="category"/>
                    : null
                  }
                </Flex>
                <Badge 
                  variant="outline" 
                  p={1} 
                  borderRadius="5"
                  fontSize={['sm','md']}
                >
                  S/{product.price}
                </Badge>
              </Flex>
              <Divider orientation="horizontal"/>
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