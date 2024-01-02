"use client"

import React, { createContext, useContext, useState } from "react";
import axios from "axios"

interface Tag {
  id?: number
  title: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}

export const TagContext = createContext<{
  tags: any[];
  loadTags: () => Promise<void>;
  createTag: (tag: Tag) => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
  updateTag: (id:number, tag: Tag) => Promise<void>;
}>({
  tags: [],
  loadTags: async () => {},
  createTag: async (tag: Tag) => {},
  deleteTag: async (id: number) => {},
  updateTag: async (id:number, tag: Tag) => {}
})

export const useTags = () => {
  const context = useContext(TagContext)
  if (!context) {
    throw new Error("useTags must be used within a TagProvider")
  }
  return context
}

export const TagProvider = ({children} : {children: React.ReactNode}) => {

  const [tags, setTags] = useState<Tag[]>([])

  const loadTags = async () => {
    const res = await axios.get("/api/tags")
    setTags(res.data)
  }

  const createTag = async (values: Tag) => {
    const res = await axios.post('/api/tags', values)
    axios.get("/api/revalidate")
    setTags([...tags, res.data])
  }

  const deleteTag = async (id: number) => {
    await axios.delete(`/api/tags/${id}`)
    axios.get("/api/revalidate")
    setTags(tags.filter(tag => tag.id !== id))
  }

  const updateTag = async (id: number, values: Tag) => {
    const res = await axios.put(`/api/tags/${id}`, values)
    axios.get("/api/revalidate")
    setTags(tags.map(tag => tag.id === id ? res.data : tag))
  }

  return <TagContext.Provider 
    value = 
      {
        { 
          tags, 
          loadTags, 
          createTag, 
          deleteTag,
          updateTag 
        }
      }
    >
    {children}
  </TagContext.Provider>
}