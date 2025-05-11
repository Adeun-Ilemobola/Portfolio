import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS // Use app-specific password (NOT your real Gmail password)
  },
});


export async function sendEmail( { subject = 'No Subject', text = 'No Content', } : {
        subject: string;
        text: string;
        }
) {
    const mailOptions = {
    from: process.env.GMAIL_USER, // Your Gmail address
    to: process.env.GMAIL_USER, // Recipient's email address
    subject: subject, // Subject of the email
    text: text, // Plain text body of the email
    };
    console.log("Sending email", mailOptions);
    
  
    return transporter.sendMail(mailOptions);
  }