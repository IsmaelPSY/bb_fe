export interface IProduct {
  _id: string
  title: string
  description?: string
  image_urls: string[]
  category?: string
  size?: string
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
  size?: ENewProductSize
  gender?: ENewProductGender
  price: number 
  available: boolean  
}


export enum ENewProductSize {
  BABY0 = "0",
  BABY2 = "2",
  BABY4 = "4",
  BABY6 = "6",
  BABY8 = "8"
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