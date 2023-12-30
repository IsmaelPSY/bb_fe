import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = params;

    const products = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    })

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

export async function PUT(req: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = params;
    const body = await req.json()
  
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      }
      ,
      data: body
    })
  
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
  const {id} = params;

  const product = await prisma.product.delete({
    where: {
      id: Number(id)
    }
  })

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