"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg mt-4">We&apos;re sorry, but an error occurred.</p>
      <p className="text-md text-gray-600 mt-2">
        Redirecting to the homepage...
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Home Now
      </button>
    </div>
  );
};

export default ErrorPage;
