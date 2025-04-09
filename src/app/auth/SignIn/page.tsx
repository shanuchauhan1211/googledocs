"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/frontendApis/authApi/authApi";
import { useRouter } from "next/navigation";
import { hydrateAuthState } from "@/store/authStore";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { showToast } from "@/lib/toast-helperfxn";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const [mail, setMail] = useState("");
  useEffect(() => {
    hydrateAuthState();
  }, []);

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { status, mutate } = useMutation({
    mutationFn: loginApi,
    onError: (error) => {
      showToast("error", `${error.message}`);
    },
    onSuccess: (data) => {
      setUser(data.profile);
      setToken(data.jwt);

      console.log(user);
      if (data) {
        setCookie("jwt", data.jwt, { path: "/" });
        showToast("success", "Logged In Successfully");
        setCookie("user", JSON.stringify(data.profile), { path: "/" });
      }

      showToast("info", `Welcome ${mail}`);
      router.push("/");
    },
  });

  const isLoading = status === "pending";

  const onSubmit = (data: { email: string; password: string }) => {
    setMail(data.email);
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600 ">
      <div className="bg-white px-12 py-10  rounded-xl border border-5 border-black shadow-2xl">
        <div className="flex gap-x-5 items-center ">
          {" "}
          <span className="mb-2 ">
            Welcome to{" "}
            <span className="underline underline-offset-4  font-semibold">
              Meow Doc
            </span>{" "}
          </span>{" "}
          <Image alt="logo" width={50} height={50} src="/logo.svg" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form
          className="flex flex-col gap-4 w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email")}
            placeholder="Email"
            className="p-2 border text-sm"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2 border text-sm"
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
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </form>

        <Button
          variant={"link"}
          onClick={() => router.push("/auth/SignUp")}
          className="mt-4 duration-300 hover:text-blue-500"
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </div>
    </div>
  );
}
