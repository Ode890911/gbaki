import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    void body

    // TODO: Send email via Resend (use body.name, body.email, etc.)
    // TODO: Save to database
    // TODO: Send notification to support team

    return NextResponse.json({ 
      success: true,
      message: 'Message received. We\'ll respond within 4-6 hours.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

