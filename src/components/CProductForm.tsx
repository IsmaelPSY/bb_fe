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
import { Box, Flex, Radio, RadioGroup, Select, Stack, Switch, Tag, TagLabel, useToast } from "@chakra-ui/react";

import { ENewProductCategory, ENewProductGender, ENewProductSize, INewProduct } from "@/interfaces/IProduct";


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Insertar un titulo menor a 100 caracteres",
  }).max(100),
  description: z.string().min(1, {
    message: "Insertar una descripcion"
  }),
  image_urls: z.array(z.string()),
  category: z.enum(["s", "c", "a"]),
  size: z.string(),
  gender: z.enum(["b", "g"]),
  price: z.coerce.number().nonnegative(),
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

const transformToProductSize = (size: string): ENewProductSize => {
  switch (size){
    case '0':
      return ENewProductSize.BABY0;
    case '2':
      return ENewProductSize.BABY2;
    case '4':
      return ENewProductSize.BABY4;
    case '6':
      return ENewProductSize.BABY6;
    case '8':
      return ENewProductSize.BABY8;
    default:
      throw new Error(`Invalid size value: ${size}`);
  }
}

const transformToProduct = (values: z.infer<typeof formSchema>): INewProduct => {
  return {
    title: values.title,
    description: values.description,
    image_urls: values.image_urls,
    category: transformToProductCategory(values.category),
    size: values.size !== "no" ? transformToProductSize(values.size) : undefined,
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
      category: "",
      size: "no",
      gender: "",
      price: 0,
      available: true
    },
  })

  const toast = useToast()

  const {createProduct, updateProduct} = useProducts();


  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if (initalData){
        updateProduct(initalData._id, transformToProduct(values))
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
                <Input placeholder="Precio" type="number" {...field} min={0}/>
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
                <RadioGroup 
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                >
                  <Stack direction='row'>
                    <Radio value="b">Niño</Radio>
                    <Radio value="g">Niña</Radio>
                  </Stack>
                </RadioGroup>
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
                  <option value="no">--</option>
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
                <RadioGroup 
                  value={field.value}
                  onChange={(e) => field.onChange(e)} 
                >
                  <Stack direction='row'>
                    <Radio value="c">Ropa</Radio>
                    <Radio value="s">Zapatos</Radio>
                    <Radio value="a">Accesorios</Radio>
                  </Stack>
                </RadioGroup>
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