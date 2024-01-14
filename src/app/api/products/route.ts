import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export async function GET() {
  try {
    await mongooseConnect()
    const products = await Product.find()
    return NextResponse.json(products)
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

export async function POST(request: Request) {
  try {
    await mongooseConnect()
    const body = await request.json()
    const product = await Product.create(body)
   
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