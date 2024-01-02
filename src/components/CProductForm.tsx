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
import { useProducts } from "@/context/ProductContext";
import CUploadImageInput from "./CUploadImageInput";
import { useToast } from "@chakra-ui/react";

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


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Insertar un titulo",
  }),
  description: z.string().min(1, {
    message: "Insertar una descripcion",
  }),
  image_urls: z.array(z.string()),
  tags: z.array(z.string()),
  price: z.coerce.number(),
  available: z.boolean()
})

const transformToProduct = (values: z.infer<typeof formSchema>): Product => {
  return {
    title: values.title,
    description: values.description,
    image_urls: values.image_urls,
    tags: values.tags,
    price: values.price,
    available: values.available
  }
}

export default function CProductForm ({setIsOpen, initalData}: {setIsOpen: (isOpen: boolean) => void, initalData?: any}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalData || {
      title: "",
      description: "",
      image_urls: [],
      tags: [],
      price: 0,
      available: true
    },
  })

  const {createProduct, updateProduct} = useProducts();
  const toast = useToast()

  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if (initalData){
        updateProduct(initalData.id, transformToProduct(values))
        toast({
          title: 'Producto actualizado',
          description: "El producto ha sido actualizado correctamente",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setIsOpen(false)
      } else {
        createProduct(transformToProduct(values))
        toast({
          title: 'Producto creado',
          description: "El producto ha sido creado correctamente",
          status:'success',
          duration: 3000,
          isClosable: true,
        })
        setIsOpen(false)
      }
    }catch (error){
      toast({
        title: 'Error',
        description: "Ha ocurrido un error",
        status:'error',
        duration: 2000,
        isClosable: true,
      })
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input placeholder="Descripcion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input placeholder="Precio" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagenes</FormLabel>
              <FormControl>
                <CUploadImageInput 
                	value={field.value.map((image) => image)}
                  onChange={(url) => field.onChange([...field.value, url])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current !== url),
                    ])
                  }
                />
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