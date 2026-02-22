import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, query, enquiryType } = body;

        // Validate inputs
        if (!name || !email || !query || !enquiryType) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Configure Nodemailer transporter
        // Note: To use Gmail, you'll need an App Password if 2FA is enabled.
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or another SMTP service
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_EMAIL, // sender address
            to: process.env.SMTP_EMAIL, // list of receivers (send to yourself)
            replyTo: email, // reply to the user who filled the form
            subject: `New Lead: ${enquiryType} Enquiry from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Enquiry Type: ${enquiryType}
        
        Message:
        ${query}
      `,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
            .container { max-w-xl: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); padding: 30px 40px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1px; }
            .content { padding: 40px; }
            .greeting { color: #334155; font-size: 18px; margin-bottom: 24px; font-weight: 600; }
            .detail-row { border-bottom: 1px solid #f1f5f9; padding: 12px 0; display: flex; flex-direction: column; }
            .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: bold; margin-bottom: 4px; }
            .value { font-size: 16px; color: #0f172a; font-weight: 500; }
            .message-box { margin-top: 30px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
            .message-content { font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin: 0; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <!-- Text Logo Fallback (Since images might be blocked by clients) -->
              <h1 style="font-weight: 900; margin-bottom: 5px;">Investa Finserve</h1>
              <p style="color: #cbd5e1; margin: 0; font-size: 13px; letter-spacing: 2px;">NEW ENQUIRY RECEIVED</p>
            </div>
            <div class="content">
              <div class="greeting">You have a new lead!</div>
              
              <div class="detail-row">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="detail-row">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></div>
              </div>
              
              <div class="detail-row">
                <div class="label">Enquiry Category</div>
                <div class="value" style="display: inline-block; background-color: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 999px; font-size: 13px; font-weight: bold; margin-top: 4px;">
                  ${enquiryType}
                </div>
              </div>
              
              <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message Detail</div>
                <p class="message-content">${query}</p>
              </div>
            </div>
            <div class="footer">
              This email was automatically generated from your website's contact form.<br/>
              &copy; ${new Date().getFullYear()} Investa Finserve Services
            </div>
          </div>
        </body>
        </html>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { message: 'Failed to send email. Please ensure SMTP credentials are correct.' },
            { status: 500 }
        );
    }
}
