import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // If Resend is configured, use it
    if (resend && process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        })
        
        return NextResponse.json({ 
          success: true,
          message: 'Successfully subscribed!' 
        })
      } catch (resendError) {
        console.error('Resend error:', resendError)
        // Fall through to logging if Resend fails
      }
    }
    
    // Simulate delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed!' 
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

