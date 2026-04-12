import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WetPaintButton = ({ children, className, disableDrips = false, lightDrips = false, ...props }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <button
      {...props}
      className={cn(
        "group relative rounded-2xl bg-white px-12 py-8 font-bold text-black transition-colors hover:bg-gray-200",
        className
      )}
    >
      {children}

      {!disableDrips &&
        (isMobile ? (
          lightDrips ? (
            <Drip left="50%" height={12} delay={1.5} />
          ) : (
            <>
              <Drip left="25%" height={16} delay={0.8} />
              <Drip left="75%" height={12} delay={2.5} />
            </>
          )
        ) : (
          <>
            <Drip left="10%" height={24} delay={0.5} />
            <Drip left="30%" height={20} delay={3} />
            <Drip left="57%" height={10} delay={4.25} />
            <Drip left="85%" height={16} delay={1.5} />
          </>
        ))}
    </button>
  );
};

const Drip = ({ left, height, delay }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      className="absolute top-[99%] origin-top z-10"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: isMobile ? 1.7 : 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: isMobile ? 3.6 : 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-white transition-colors group-hover:bg-gray-200"
      />

      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <path
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-white transition-colors group-hover:fill-gray-200"
        />
      </svg>

      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-white transition-colors group-hover:fill-gray-200"
        />
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, isMobile ? 30 : 50], opacity: [1, 0] }}
        transition={{
          duration: isMobile ? 1.7 : 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: isMobile ? 3.6 : 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-white transition-colors group-hover:bg-gray-200"
      />
    </motion.div>
  );
};

export default WetPaintButton;
