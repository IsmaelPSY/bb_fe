import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()
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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const tag = await prisma.tag.create({
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