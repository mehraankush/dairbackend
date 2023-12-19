import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.APP_PASSWORD,
    },
});

const sendVerificationEmail = async (email, token) => {

    try {
        const mailOptions = {
            from: `"Ankush" ${process.env.EMAIL_ID}`,
            to: email,
            subject: 'Magic Link Verification',
            text: `Click the following link to verify your email: ${process.env.SERVER_URL}/auth/verify?token=${encodeURIComponent(token)}`,
            html: `<p>Click the following link to verify your email:</p><a href="${process.env.SERVER_URL}/auth/verify?token=${encodeURIComponent(token)}">Verify Email</a>`,
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }

};

export default sendVerificationEmail;
