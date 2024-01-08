"use client"

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

import { useProducts } from "@/context/ProductContext"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ButtonGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Tag, TagLabel, useToast, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverBody, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import CProductForm from "./CProductForm"
import { IProduct } from "@/interfaces/IProduct"
import CProductTag from "./CProductTag"

export default function CProductTable () {

  const { products, loadProducts, deleteProduct } = useProducts()
  const toast = useToast()

  const [isOpen, setIsOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    loadProducts()
  }, [])

  const handleUpdateProduct = (id: number) => {
    const product = products.find(product => product.id === id)
    setProductToUpdate(product)
    setIsOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    try{
      deleteProduct(id)
      toast({
        title: 'Etiqueta eliminada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error al eliminar la etiqueta',
        status:'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return(
    <>
      <Button colorScheme="blue" size="sm" className="my-2" 
        onClick={() => {
          setProductToUpdate(null)
          setIsOpen(true)
        }}
      >
        Agregar Producto
      </Button>

      <TableContainer className="mt-5 bg-sky-50">
        <Table size='sm' colorScheme="telegram">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Caracteristicas</Th>
              <Th isNumeric>Precio</Th>
              <Th>Disponible</Th>
              <Th className="w-40"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((p: IProduct) => <Tr key={p.id}>
              <Td>{p.title}</Td>

              <Td>{p.description}</Td>
              <Td>
                <HStack>
                  {
                    Number.isInteger(p.size)
                    ? <CProductTag value={p.size} type="size"/>
                    : null
                  }
                  {
                    p.gender
                   ? <CProductTag value={p.gender} type="gender"/>
                    : null
                  }
                  {
                    p.category
                  ? <CProductTag value={p.category} type="category"/>
                    : null
                  }
                </HStack>
              </Td>
              <Td isNumeric>S/{p.price}</Td>
              <Td>
                {p.available 
                ? <Tag colorScheme="green"><TagLabel>Disponible</TagLabel></Tag> 
                : <Tag colorScheme="red"><TagLabel>No Disponible</TagLabel></Tag> 
                }
              </Td>
              <Td>
                <ButtonGroup gap="2">
                  <Button size='sm' colorScheme="blue" onClick={() => handleUpdateProduct(p.id)}>Editar</Button>
                  <Popover>
                    <PopoverTrigger>
                      <Button size='sm' colorScheme="red">Eliminar</Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent w="105px">
                        <PopoverArrow />
                        <PopoverBody>
                          <Text fontSize="sm">Confirmar Eliminación</Text>
                          <Button size='sm' colorScheme="red" onClick={()=> handleDeleteProduct(p.id)}>Eliminar</Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </ButtonGroup>
              </Td>
            </Tr>)}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Producto</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <CProductForm setIsOpen={setIsOpen} initalData={productToUpdate}/>
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
