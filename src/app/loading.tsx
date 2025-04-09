"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const sectionVariants: Variants = {
  hidden: { y: "100vh" },
  visible: (custom: number) => ({
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  }),
};

const Loader: React.FC = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className="relative w-[99vw] h-[99vh] flex items-center justify-center bg-white overflow-y-hidden">
        <div className="absolute  flex w-full h-full ">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex-1 bg-blue-500 h-full"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 2,
            opacity: 1,
            transition: { delay: 0, duration: 0.5 },
          }}
          className="absolute "
        >
          <div className="bg-white rounded-full ">
            <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
