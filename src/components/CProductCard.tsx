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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Image from "next/image"


export default function CProductCard ({ product }: {product: IProduct}) {

  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <Card 
        onClick={() => setIsOpen(true)} 
        className="cursor-pointer hover:shadow-2xl shadow-blue-800"
      >
        <CardHeader p={2}>
          <Grid templateColumns='repeat(2, auto)' alignItems="center">
            <Heading as="h6" fontFamily="appFont" size={['sm', 'md']}>{product.title}</Heading>
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
          <Image 
            className="rounded-sm" 
            src={product.image_urls[0]} 
            alt={product.title} 
            width={500}
            height={500}
            priority={true}
          />
        </CardBody>
        <CardFooter p={2}>
          <Text fontSize="sm">
            {product.description}
          </Text>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={["xs", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between">
              <Heading as="h6" fontFamily="appFont" size={['md', 'md']}>{product.title}</Heading>
              <Button onClick={() => setIsOpen(false)} size="sm">Cerrar</Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Carousel>
              <CarouselContent>
                {
                  product.image_urls.map(url => (
                    <CarouselItem key={url} className="flex items-center justify-center">
                      <Image 
                        className="rounded-sm" 
                        src={url} 
                        alt={product.title} 
                        width={500}
                        height={500}
                      />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>      
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