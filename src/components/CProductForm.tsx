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
import { Box, Flex, Select, Switch, Tag, TagLabel, useToast } from "@chakra-ui/react";

import { ENewProductCategory, ENewProductGender, INewProduct } from "@/interfaces/IProduct";


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Insertar un titulo menor a 100 caracteres",
  }).max(100),
  description: z.string().min(1, {
    message: "Insertar una descripcion",
  }).max(250, {
    message: "Insertar una descripcion menor a 250 caracteres",
  }),
  image_urls: z.array(z.string()),
  category: z.enum(["s", "c", "a"]),
  size: z.coerce.number(),
  gender: z.enum(["b", "g"]),
  price: z.coerce.number(),
  available: z.coerce.boolean()
})

const transformToProductGender = (gender: string): ENewProductGender => {
  switch (gender) {
    case 'b':
      return ENewProductGender.BOY;
    case 'g':
      return ENewProductGender.GIRL;
    default:
      throw new Error(`Invalid gender value: ${gender}`);
  }
}

const transformToProductCategory = (category: string): ENewProductCategory => {
  switch (category){
    case 's':
      return ENewProductCategory.SHOES;
    case 'c':
      return ENewProductCategory.CLOTHES;
    case 'a':
      return ENewProductCategory.ACCESSORIES;
    default:
      throw new Error(`Invalid category value: ${category}`);
  }
}

const transformToProduct = (values: z.infer<typeof formSchema>): INewProduct => {
  return {
    title: values.title,
    description: values.description,
    image_urls: values.image_urls,
    category: transformToProductCategory(values.category),
    size: values.size,
    gender: transformToProductGender(values.gender),
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
      category: "c",
      size: 0,
      gender: "b",
      price: 0,
      available: true
    },
  })

  const toast = useToast()

  const {createProduct, updateProduct} = useProducts();


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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <FormControl>
                <Select 
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <option value="b">Niño</option>
                  <option value="g">Niña</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Talla</FormLabel>
              <FormControl>
                <Select 
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select 
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)} 
                >
                  <option value="c">Ropa</option>
                  <option value="s">Zapatos</option>
                  <option value="a">Accesorios</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponible:</FormLabel>
              <FormControl>
                <Flex justifyContent="space-between">
                  {
                    field.value 
                    ? <Tag colorScheme="green"><TagLabel>Disponible</TagLabel></Tag> 
                    : <Tag colorScheme="red"><TagLabel>No Disponible</TagLabel></Tag> 
                  }
                  <Switch 
                    size="lg" 
                    colorScheme="green"
                    isChecked={field.value} 
                    onChange={(e) => field.onChange(e.target.checked)} 
                  />
                </Flex>
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