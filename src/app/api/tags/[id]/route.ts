import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = params;

    const tags = await prisma.tag.findUnique({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json(tags)
    
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
  
    const tag = await prisma.tag.update({
      where: {
        id: Number(id)
      }
      ,
      data: body
    })
  
    return NextResponse.json(tag)
  
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

  const tag = await prisma.tag.delete({
    where: {
      id: Number(id)
    }
  })

  return NextResponse.json(tag)

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