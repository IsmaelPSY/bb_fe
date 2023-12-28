import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const products = await prisma.product.findMany()
  console.log({products})
  return NextResponse.json({
    data: products
  })
}

export function PUT() {
  return NextResponse.json({
    message: "update 1 product"
  })
}

export function DELETE() {
  return NextResponse.json({
    message: "delete 1 product"
  })
}