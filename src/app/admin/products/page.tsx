"use client"

import CProductForm from "@/components/CProductForm";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import axios from 'axios';

export default function AdminProducts() {



  const [products, setProducts] =useState([])
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .then(data => setProducts(data.products))
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log({event: event.target})
  }

  return(
    <div className="container mx-auto">
      <Button colorScheme="blue" size="sm" className="my-2" onClick={() => setIsOpen(true)}>Agregar Producto</Button>
      <TableContainer className="mt-5 bg-sky-50">
        <Table size='sm' colorScheme="telegram">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Tipo</Th>
              <Th isNumeric>Precio</Th>
              <Th isNumeric>Cantidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Polo</Td>
              <Td>Bebe</Td>
              <Td isNumeric>55</Td>
              <Td isNumeric>15</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Producto</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <CProductForm setIsOpen={setIsOpen}/>
            </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}