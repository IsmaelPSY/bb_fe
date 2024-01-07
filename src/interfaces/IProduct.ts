export interface IProduct {
  id: number
  title: string
  description?: string
  image_urls: string[]
  category?: string
  size?: number
  gender?: string
  price: number 
  available: boolean  
  createdAt: Date 
  updatedAt: Date 
}



export interface INewProduct {
  title: string
  description?: string
  image_urls: string[]
  category?: ENewProductCategory
  size?: NewProductSize
  gender?: ENewProductGender
  price: number 
  available: boolean  
}


enum NewProductSize {
  BABY0 = 0,
  BABY1 = 2,
  BABY2 = 4,
  BABY3 = 6,
  BABY4 = 8
}

export enum ENewProductGender {
  BOY = "b",
  GIRL = "g"
}

export enum ENewProductCategory {
  CLOTHES = "c",
  SHOES = "s",
  ACCESSORIES = "a"
}