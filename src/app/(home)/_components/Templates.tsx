"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createApi } from "@/frontendApis/docApi/docApi";
import { showToast } from "@/lib/toast-helperfxn";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "blank",
    label: "Untitled Documnet",
    imageUrl: "/logo.svg",
    content: "Start Typing....",
  },
  {
    id: "Resume1",
    label: "Resume1",
    imageUrl: "/resume.jpg",
    content: "Resume Layout1",
  },
  {
    id: "Document1",
    label: "Document1",
    imageUrl: "/doc.jpg",
    content: "Document Lauout 1",
  },
  {
    id: "Document2",
    label: "DDocument2",
    imageUrl: "/doc.jpg",
    content: "Document Lauout 2",
  },
  {
    id: "Document3",
    label: "Document3",
    imageUrl: "/doc.jpg",
    content: "Document Lauout 3",
  },
  {
    id: "Resume2",
    label: "Resume2",
    imageUrl: "/resume.jpg",
    content: "Resume Layout2",
  },
];

export const Templates = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const { status, mutate } = useMutation({
    mutationFn: createApi,
    onError: () => {
      showToast("error", "Failed to Create Document");
    },
    onSuccess: (data) => {
      console.log(data);
      router.push(`/documents/${data.doc}`);

      showToast("success", "Doc created succesfully");
    },
  });

  const isCreating = status === "pending";

  return (
    <div className="bg-[#F1F3F4]">
      <div className=" max-w-screen-xl mx-auto px-16 py-6  flex flex-col gap-y-4">
        <h3 className="font-medium ">Create A New Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4 ">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                onClick={() => {
                  mutate({
                    title: template.label,
                    content: template.content,
                    ownerId: user?._id as string,
                  });
                }}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5  2xl:basis-[14.285714%] pl-4 "
              >
                <div
                  className={cn(
                    "aspect-[3/4]  flex flex-col  gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <button
                    className="size-full hover:border-blue-500 rounded-sm border transition flex flex-col items-center justify-center gap-y-4 bg-white overflow-hidden relative"
                    disabled={isCreating}
                    onClick={() => {}}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-500 ease-in-out scale-100 hover:scale-110"
                      style={{
                        backgroundImage: `url(${template.imageUrl})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </button>

                  <p className="text-sm  font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
};
