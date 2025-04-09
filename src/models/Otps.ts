import { Schema, models, model, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  otpExpires: Date;
  otpStatus: "pending" | "completed";
}

const otpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    otpExpires: { type: Date, required: true },
    otpStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

otpSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 0 });

const Otp = models?.Otp || model<IOtp>("Otp", otpSchema);

export default Otp;
