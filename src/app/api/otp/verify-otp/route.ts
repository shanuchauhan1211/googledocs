import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Otps from "@/models/Otps";

export async function POST(request: NextRequest) {
    try {
        const { email, otp } = await request.json();
        const loweredEmail = email.toLowerCase();

        if (!loweredEmail || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }

        await connectDB();

        const otpRecord = await Otps.findOne({ email:loweredEmail, otp, otpStatus: "pending" });

        if (!otpRecord) {
            return NextResponse.json({ error: "Invalid OTP or OTP expired" }, { status: 400 });
        }

        
        otpRecord.otpStatus = "completed";
        await otpRecord.save();

        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
    }
}
