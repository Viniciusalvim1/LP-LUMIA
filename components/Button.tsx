"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "md",
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold cursor-pointer transition-all duration-200 select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-[#060F1E] hover:shadow-[0_0_60px_rgba(0,201,167,0.5),0_0_120px_rgba(0,201,167,0.2)]",
    ghost:
      "border border-white/20 text-white hover:border-[#00C9A7] hover:text-[#00C9A7] bg-transparent",
  };

  const classes = `${base} ${variants[variant]} ${sizeClasses[size]} ${className}`;

  const Tag = href ? "a" : "button";

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Tag href={href} onClick={onClick} className={classes}>
        {children}
      </Tag>
    </motion.div>
  );
}
