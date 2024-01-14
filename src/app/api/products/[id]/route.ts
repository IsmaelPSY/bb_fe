import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export async function GET(req: Request, {params}: {params: {id: string}}) {
  try {
    await mongooseConnect()

    const {id} = params;

    const product = await Product.findById(id)

    return NextResponse.json(product)
    
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

export async function PUT(req: Request, {params}: {params: {id: string}}) {
  try {
    await mongooseConnect()

    const {id} = params;
    const body = await req.json()
  
    const product = await Product.findByIdAndUpdate(id, body)
  
    return NextResponse.json(product)
  
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

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
 try {
  await mongooseConnect()

  const {id} = params;

  const product = await Product.findByIdAndDelete(id)

  return NextResponse.json(product)

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