import React from "react";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#070B17]">

      {/* Left Blue Glow */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-72 top-10 h-[750px] w-[750px] rounded-full bg-blue-500/40 blur-[180px]"
      />

      {/* Right Purple Glow */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-72 top-0 h-[750px] w-[750px] rounded-full bg-violet-500/20 blur-[180px]"
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute bottom-[-250px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[180px]"
      />
            {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(7,11,23,.35) 60%, rgba(7,11,23,.9) 100%)",
        }}
      />

      {/* Small Stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}
            {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-72 w-full bg-gradient-to-t from-[#070B17] to-transparent" />

      {/* Bottom Grid Glow */}
      <div
        className="absolute bottom-0 left-0 h-[320px] w-full opacity-30"
        style={{
          background: `
            linear-gradient(to top, rgba(37,99,235,.18), transparent),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 59px,
              rgba(255,255,255,.08) 60px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 59px,
              rgba(255,255,255,.08) 60px
            )
          `,
        }}
      />

    </div>
  );
}