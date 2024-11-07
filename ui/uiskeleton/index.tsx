import { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface UISkeletonProps {
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}
export default function UISkeleton({
  onClick,
  style,
  className,
}: UISkeletonProps) {
  return (
    <div
      className={`skeleton ${className ?? ""}`}
      style={style}
      onClick={onClick}
    ></div>
  );
}
