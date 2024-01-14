"use client"

import { INewProduct, IProduct } from "@/interfaces/IProduct";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";


export const ProductContext = createContext<{
  products: any[];
  loadProducts: () => Promise<void>;
  createProduct: (product: INewProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id:string, product: INewProduct) => Promise<void>;
}>({
  products: [],
  loadProducts: async () => {},
  createProduct: async (product: INewProduct) => {},
  deleteProduct: async (id: string) => {},
  updateProduct: async (id:string, product: INewProduct) => {}
})

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

export const ProductProvider = ({children} : {children: React.ReactNode}) => {

  const [products, setProducts] = useState<IProduct[]>([])

  const loadProducts = async () => {
    const res = await axios.get("/api/products")
    setProducts(res.data)
  }

  const createProduct = async (values: INewProduct) => {
    const res = await axios.post('/api/products', values)
    axios.get("/api/revalidate")
    setProducts([...products, res.data])
  }

  const deleteProduct = async (id: string) => {
    await axios.delete(`/api/products/${id}`)
    axios.get("/api/revalidate")
    setProducts(products.filter(product => product._id !== id))
  }

  const updateProduct = async (id: string, values: INewProduct) => {
    const res = await axios.put(`/api/products/${id}`, values)
    axios.get("/api/revalidate")
    setProducts(products.map(product => product._id === id ? res.data : product))
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