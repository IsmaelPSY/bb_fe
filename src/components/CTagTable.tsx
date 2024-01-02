"use client"

interface Tag {
  id?: number
  title: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ButtonGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Tag, TagLabel, Box, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Text, Spinner, Heading, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import CTagForm from "./CTagForm"
import { useTags } from "@/context/TagContext"


export default function CTagTable () {

  const { tags, loadTags, deleteTag } = useTags()
  const toast = useToast()

  const [isOpen, setIsOpen] = useState(false);
  const [tagToUpdate, setTagToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTags()
  }, [])

  const handleUpdateTag = (id: number) => {
    const tag = tags.find(tag => tag.id === id)
    setTagToUpdate(tag)
    setIsOpen(true)
  }

  const handleDeleteTag = (id: number) => {
    try{
      deleteTag(id)
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
          setTagToUpdate(null)
          setIsOpen(true)
        }}
      >
        Agregar Etiqueta
      </Button>

      <TableContainer className="mt-5 bg-sky-50">
        <Table size='sm' colorScheme="telegram">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Color</Th>
              <Th className="w-40"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {tags.map((t) => <Tr key={t.id}>
              <Td>{t.title}</Td>
              <Td><Box bg={t.color} w="50px" h="20px" className="rounded-md"></Box></Td>
              <Td>
                <ButtonGroup gap="2">
                  <Button size='sm' colorScheme="blue" onClick={() => handleUpdateTag(t.id)}>Editar</Button>
                  <Popover>
                    <PopoverTrigger>
                      <Button size='sm' colorScheme="red">Eliminar</Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent w="105px">
                        <PopoverArrow />
                        <PopoverBody>
                          <Text fontSize="sm">Confirmar Eliminación</Text>
                          <Button size="sm" colorScheme='red' onClick={()=> handleDeleteTag(t.id)}>Eliminar</Button>
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
          <ModalHeader>
            <Flex>
              <Heading size="md" className="mr-2">
                Nueva Etiqueta
              </Heading>
              {
                isLoading
                ? <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='md'
                  /> 
                : <></>
              }
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <CTagForm setIsOpen={setIsOpen} initalData={tagToUpdate} setIsLoading={setIsLoading}/>
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
