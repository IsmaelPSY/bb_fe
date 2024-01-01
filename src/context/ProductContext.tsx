"use client"

import axios from "axios";
import React, { createContext, useContext, useState } from "react";

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

export const ProductContext = createContext<{
  products: any[];
  loadProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (id:number, product: Product) => Promise<void>;
}>({
  products: [],
  loadProducts: async () => {},
  createProduct: async (product: Product) => {},
  deleteProduct: async (id: number) => {},
  updateProduct: async (id:number, product: Product) => {}
})

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

export const ProductProvider = ({children} : {children: React.ReactNode}) => {

  const [products, setProducts] = useState<Product[]>([])

  const loadProducts = async () => {
    const res = await axios.get("/api/products")
    setProducts(res.data)
  }

  const createProduct = async (values: Product) => {
    const res = await axios.post('/api/products', values)
    axios.get("/api/revalidate")
    setProducts([...products, res.data])
  }

  const deleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`)
    axios.get("/api/revalidate")
    setProducts(products.filter(product => product.id !== id))
  }

  const updateProduct = async (id: number, values: Product) => {
    const res = await axios.put(`/api/products/${id}`, values)
    axios.get("/api/revalidate")
    setProducts(products.map(product => product.id === id ? res.data : product))
  }

  return <ProductContext.Provider 
    value = 
      {
        { 
          products, 
          loadProducts, 
          createProduct, 
          deleteProduct,
          updateProduct 
        }
      }
    >
    {children}
  </ProductContext.Provider>
}