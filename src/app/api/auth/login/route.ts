import { connectDB } from "@/lib/db";
import { createToken } from "@/lib/jwtUtils";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

   
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.format() },
        { status: 400 }
      );
    }
     await connectDB();

    const { email, password } = validationResult.data;

    const loweredEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email:loweredEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist" }, { status: 400 });
    }

    if (existingUser.password) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid password" }, { status: 400 });
      }
    }

    const token = createToken(existingUser._id.toString());

    const profile = existingUser.toObject();
    delete profile.password; 
    

    return NextResponse.json(
      {
        jwt: token,
        message: "Login Successful",
        profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }
}
