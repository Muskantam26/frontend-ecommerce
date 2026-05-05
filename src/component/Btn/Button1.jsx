import React from "react";
import { motion } from "framer-motion";

export const Button1 = ({
  text,
  icon,
  badge,
  price,
  onClick,
  className = "",
  variant = "transparent", // 'primary', 'outline', 'transparent', 'cart'
  iconPosition = "left", // 'left', 'right'
  isActive = false,
  ...props
  
}) => {
  let baseClass = "transition-colors shrink-0 outline-none ";

  if (variant === "primary") {
    baseClass +=
      "flex items-center rounded py-4 text-center  gap-2 bg-[var(--color-button)] text-[var(--color-button-text)] hover:text-[var(--color-button-text-hover)]  px-6 text-xs  relative overflow-hidden";
  } else if (variant === "outline") {
    baseClass +=
      `flex items-center gap-2 border px-6 h-13 rounded hover:bg-[var(--color-hover)] hover:border-none hover:text-[var(--color-button-text)] ${isActive ? 'bg-[var(--color-hover)] border-transparent text-[var(--color-button-text)]' : 'text-white'}`;
  } else if (variant === "transparent") {
    baseClass +=
      "flex items-center gap-1 text-white hover:text-[var(--color-button)] relative group";
  } else if (variant === "cart") {
    baseClass +=
      "flex items-center gap-3 text-white hover:text-[var(--color-button)] relative";
  }

  const badgeClass =
    variant === "cart"
      ? "absolute -top-4 -right-1 bg-brand-hover text-white text-[10px] w-[14px] h-[14px] flex items-center justify-center rounded-full font-bold"
      : "absolute -top-3 -right-2 bg-white/30 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold group-hover:bg-[var(--color-button)] group-hover:text-black transition-colors";

  const iconElement =
    icon || badge != null ? (
      <div className="relative z-10">
        {icon}
        {badge != null && <span className={badgeClass}>{badge}</span>}
      </div>
    ) : null;

  const textElement = text ? (
    <span
      className={`relative z-10 ${
        variant === "outline"
          ? "font-bold text-[10px] tracking-wide uppercase"
          : variant === "primary"
            ? "font-bold"
            : "text-xs font-bold"
      }`}
    >
      {text}
    </span>
  ) : null;

  return (
    <motion.button
      whileHover={variant === "primary" ? "hover" : undefined}
      initial="initial"
      className={`${baseClass} ${className} cursor-pointer`}
      onClick={onClick}
      {...props}
    >
      {variant === "primary" && (
        <motion.div
          variants={{
            initial: { y: "100%", borderTopLeftRadius: "70%", borderTopRightRadius: "70%" },
            hover: { y: "0%", borderTopLeftRadius: "0%", borderTopRightRadius: "0%" }
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-0 left-[-10%] w-[120%] h-full bg-[var(--color-button-hover)] z-0"
        />
      )}
      {iconPosition === "left" && iconElement}
      {textElement}
      {iconPosition === "right" && iconElement}

      {price && (
        <div className="bg-[var(--color-button)] text-black px-2 py-1 rounded text-xs font-bold relative ml-1 z-10">
          {price}
          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-[var(--color-button)]" />
        </div>
      )}
    </motion.button>
  );
};
