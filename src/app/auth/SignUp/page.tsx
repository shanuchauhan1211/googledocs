"use client";

import { useMutation } from "@tanstack/react-query";
//import { useAuthStore } from "@/store/authStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi, sentOtp, verifyOtp } from "@/frontendApis/authApi/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast-helperfxn";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpPage() {
  const router = useRouter();
  // const setUser = useAuthStore((state) => state.setUser);
  const [toggle, setToggle] = useState(false);
  const [otp, setOtp] = useState("");
  const [error1, setError1] = useState("");
  const [details, setDetails] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const { status, mutate: sendOtpMutate } = useMutation({
    mutationFn: sentOtp,
    onError: () => {
      showToast("error", "Failed to Sent Otp");
    },
    onSuccess: () => {
      showToast("success", "Otp sent Successfully");
    },
  });
  const isLoading = status === "pending";

  const { status: verifyStatus, mutate: verifyOtpMutate } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      showToast("success", "Otp Verified");
      showToast("info", " Wait User is being register ");
      setToggle(false);
      if (details) {
        registerApi(details)
          .then((response) => {
            console.log("User Registered Successfully:", response);
            showToast("success", "User Registered Successfully");
            router.push("/auth/SignIn");
          })
          .catch((error) => {
            console.error("Registration failed:", error);
            setError1("Registration failed. Please try again.");
          });
      }
    },
    onError: (error) => {
      setError1("Invalid OTP. Please try again.");
      showToast("error", "Invalid OTP. Please try again.");
      console.error(error);
    },
  });

  const onSubmit = (data: {
    name: string;
    password: string;
    email: string;
  }) => {
    sendOtpMutate({ email: data.email });
    setDetails(data);
    setToggle(true);
  };

  async function handleVerify() {
    setError1("");
    if (otp.trim().length !== 6) {
      setError1("* OTP required");
      return;
    }

    if (!details) return;

    verifyOtpMutate({ email: details.email, otp });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center  min-h-screen p-4  bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white px-8 py-6  rounded-xl border border-5 border-black shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form
            className="flex flex-col gap-4 w-full text-sm  max-w-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("name")}
              placeholder="Name"
              className="p-2 border"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <input
              {...register("email")}
              placeholder="Email"
              className="p-2 border"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-2 border"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button
              variant={"default"}
              type="submit"
              className="p-2 bg-blue-500 text-white font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </Button>
          </form>
          <Button
            variant={"link"}
            className="mt-4 text-blue-500"
            onClick={() => router.push("/auth/SignIn")}
          >
            Already have an account? Login
          </Button>
        </div>
      </div>

      {toggle && (
        <div className="w-screen absolute top-0 right-0 left-0 flex flex-col items-center justify-center h-screen bg-neutral-600/80 ">
          <div className="bg-white p-8 rounded-2xl">
            <div className="relative   ">
              <p className="text-lg text-gray-20 font-semibold text-center">
                Please enter the 6-digit OTP sent to your email.
              </p>
            </div>

            <div className=" scrollbar-thin relative pt-0 pb-1 rounded-bl rounded-br">
              <div className="flex flex-col sm:flex-row items-center gap-5 my-3 text-black">
                <span className="sm:text-[20px] font-semibold">Enter OTP</span>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType="number"
                  renderSeparator={<span>&nbsp;&nbsp; </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="min-w-10 custom-account-field h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-primary-60"
                    />
                  )}
                />
              </div>
              <p className="text-red-500">{error1}</p>

              <div className="grid sticky bottom-0 mb-5 grid-cols-2 gap-5 sm:gap-10">
                <button
                  type="button"
                  onClick={() => {
                    setToggle(false);
                    setOtp("");
                  }}
                  className="mt-2 w-full bg-red-400 border hover:bg-red-600 hover:text-white font-semibold border-red-900 text-primary-70 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifyStatus === "pending"}
                  className="mt-2 w-full disabled:bg-green-200 bg-green-400 hover:bg-green-600 hover:text-white font-semibold border border-primary-70 text-white-100 py-2 rounded-md"
                >
                  {verifyStatus === "pending" ? "Verifying..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
