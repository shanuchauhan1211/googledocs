import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Otps from "@/models/Otps";
import crypto from "crypto";
import { sendEmail } from "../../mail/route"
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const loweredEmail = email.toLowerCase();
        if (!loweredEmail) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        await connectDB();


 const existingUser = await User.findOne({ email:loweredEmail });

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }


        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        let otpRecord = await Otps.findOne({ email:loweredEmail });

        if (otpRecord) {
            otpRecord.otp = otp;
            otpRecord.otpExpires = otpExpires;
            otpRecord.otpStatus = "pending";
            await otpRecord.save();
        } else {
            otpRecord = await Otps.create({ email:loweredEmail, otp, otpExpires, otpStatus: "pending" });
        }

        const html = `
            <p>Dear User,</p>
            <p>Your OTP to verify is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 5 minutes.</p>
            <p>Best regards,</p>
            <p><strong>Meow Docs</strong></p>
        `;

        const emailSent = await sendEmail({
            from: "shanu1211chauhan@gmail.com",
            to: email,
            subject: "Your OTP Code",
            html,
        });

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 });
        }

        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
}
