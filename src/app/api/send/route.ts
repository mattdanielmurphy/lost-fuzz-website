import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY)
		const { name, email, message, website_url } = await request.json()

		// Honeypot check
		if (website_url) {
			return NextResponse.json({ error: "Spam detected" }, { status: 400 })
		}

		if (!name || !email || !message) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		const senderEmail = process.env.CONTACT_FORM_SENDER_EMAIL
		const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL

		if (!senderEmail || !recipientEmail) {
			console.error("Missing email configuration")
			return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
		}

		// 1. Send email to admin
		const adminEmail = await resend.emails.send({
			from: `Lost Fuzz Website <${senderEmail}>`,
			to: recipientEmail,
			replyTo: email,
			subject: `New Message from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n To reply to them, just reply to this email.`,
		})

		if (adminEmail.error) {
			console.error("Admin email error:", adminEmail.error)
			return NextResponse.json({ error: "Failed to send admin email" }, { status: 500 })
		}

		// 2. Send confirmation email to user
		const userEmail = await resend.emails.send({
			from: `Lost Fuzz <${senderEmail}>`,
			to: email,
			subject: "Message received--Thanks",
			text: `Hi ${name},\n\nThanks for reaching out. Just letting you know, our system got your message and I will get back to you as soon as possible.\n\nTake care,\nLost Fuzz`,
		})

		if (userEmail.error) {
			console.error("User confirmation email error:", userEmail.error)
			// We don't necessarily want to fail the whole request if just the confirmation fails,
			// but for this task, let's keep it strict or at least log it.
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Contact form error:", error)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
