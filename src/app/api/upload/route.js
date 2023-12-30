import { NextResponse } from "next/server"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request) {
  try {
    const data = await request.formData()
    const image = data.get('image')

    if(!image) return NextResponse.json("no se ha subido ninguna imagen", {status: 400})

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if(error) reject(error)
        resolve(result)
      }).end(buffer)
    })

    return NextResponse.json({
      message: "Imagen subida correctamente",
      image_url: response.secure_url
    })
  
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message
      }, {
        status: 500
      })
    }
  }
}