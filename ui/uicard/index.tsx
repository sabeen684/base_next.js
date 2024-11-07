import { CSSProperties, ReactNode } from "react";

interface UICardProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
export default function UICard({ children, style, className }: UICardProps) {
  return (
    <div className={`uicard ${className}`} style={style}>
      {children}
    </div>
  );
}
