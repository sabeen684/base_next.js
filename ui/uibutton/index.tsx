import Link from "next/link";
import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";

type TButtonTypes =
  | "primary"
  | "error"
  | "plain"
  | "warning"
  | "success"
  | "secondary"
  | "detail"
  | "edit";

interface UIButtonProps {
  children?: ReactNode;
  id?: string;
  label?: string | ReactNode;
  style?: CSSProperties;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: TButtonTypes;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean; 
}

export default function UIButton({
  href,
  id,
  label,
  onClick,
  style,
  type,
  className,
  target,
  disabled, // Include the disabled prop
}: UIButtonProps) {
  return href ? (
    <Link
      id={id}
      href={disabled ? "#" : href}
      className={`btn btn-${type ? type : "link"} ${
        disabled ? "btn-disabled" : ""
      } ${className ? className : ""}`}
      style={style}
      target={target}
      onClick={(e) => disabled && e.preventDefault()} 
    >
      {label}
    </Link>
  ) : (
    <button
      id={id}
      className={`btn btn-${type ? type : "plain"} ${
        className ? className : ""
      } ${disabled ? "btn-disabled" : ""}`}
      style={style}
      onClick={onClick}
      disabled={disabled} 
    >
      {label}
    </button>
  );
}
