import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Otps from "@/models/Otps";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .max(12, { message: "Name must be between 5-12 characters" })
    .min(5, { message: "Name must be between 5-12 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.format() },
        { status: 400 },
      );
    }
    await connectDB();

    const { name, email, password } = validationResult.data;
    const loweredEmail = email.toLowerCase();
    if (!loweredEmail || !password || !name) {
      return NextResponse.json(
        { error: "Name, Email, and Password are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: loweredEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    const otpRecord = await Otps.findOne({
      email: loweredEmail,
      otpStatus: "completed",
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "OTP not verified" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: loweredEmail,
      password: hashedPassword,
    });

    // await Otps.deleteOne({ email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: newUser._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Failed To Register" }, { status: 500 });
  }
}
