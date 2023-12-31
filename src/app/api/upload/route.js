import { NextResponse } from "next/server"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


export async function POST(request) {
  try {
    const data = await request.formData()
    const image = data.get('image')

    if(!image) return NextResponse.json("no se ha subido ninguna imagen", {status: 400})

    const fileBuffer = await image.arrayBuffer()

    const mime = image.type; 
    const encoding = 'base64'; 
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileUri, {
        folder: "products",
        invalidate: true
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
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