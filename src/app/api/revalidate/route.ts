import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get('path')

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, now: Date.now() })
    }
   
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing path to revalidate',
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