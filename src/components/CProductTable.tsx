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
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ButtonGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Tag, TagLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import CProductForm from "./CProductForm"


export default function CProductTable () {

  const { products, loadProducts, deleteProduct } = useProducts()

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
              <Th>Disponible</Th>
              <Th>Etiquetas</Th>
              <Th isNumeric>Precio</Th>
              <Th className="w-40"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((p) => <Tr key={p.id}>
              <Td>{p.title}</Td>
              <Td>
                {p.available 
                ? <Tag colorScheme="green"><TagLabel>Disponible</TagLabel></Tag> 
                : <Tag colorScheme="red"><TagLabel>No Disponible</TagLabel></Tag> 
                }
              </Td>
              <Td></Td>
              <Td isNumeric>S/{p.price}</Td>
              <Td>
                <ButtonGroup gap="2">
                  <Button size='sm' colorScheme="blue" onClick={() => handleUpdateProduct(p.id)}>Editar</Button>
                  <Button size='sm' colorScheme="red" onClick={()=> deleteProduct(p.id)}>Eliminar</Button>
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
