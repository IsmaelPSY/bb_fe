"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
const axios = require('axios').default;

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTags } from "@/context/TagContext";
import CUploadImageInput from "./CUploadImageInput";
import { useToast } from "@chakra-ui/react";

interface Tag {
  id?: number
  title: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Insertar un titulo",
  }),
  color: z.string().min(1, {
    message: "Eliga un color",
  })
})

const transformToTag = (values: z.infer<typeof formSchema>): Tag => {
  return {
    title: values.title,
    color: values.color,
  }
}

export default function CTagForm (
  {setIsOpen, initalData, setIsLoading}: 
  {setIsOpen: (isOpen: boolean) => void, initalData?: any, setIsLoading: (isOpen: boolean) => void}
  ) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalData || {
      title: "",
      color: "",
    },
  })

  const {createTag, updateTag} = useTags();
  const toast = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setIsLoading(true)
      if (initalData){
        updateTag(initalData.id, transformToTag(values))
        toast({
          title: 'Etiqueta actualizada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setIsOpen(false)
      } else {
        createTag(transformToTag(values))
        toast({
          title: 'Etiqueta creada',
          status:'success',
          duration: 3000,
          isClosable: true,
        })
        setIsOpen(false)
      }
    }catch (error){
      toast({
        title: 'Error',
        status:'error',
        duration: 2000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccione un color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="mr-2">
            {
              initalData ? "Editar" : "Crear"
            }
          </Button>
          <Button type="button" variant="secondary" onClick={()=> setIsOpen(false)}>Cancelar</Button>
        </div>
      </form>
    </Form>
  )
}