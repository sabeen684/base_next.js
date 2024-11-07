import React, { CSSProperties, ReactNode } from "react";
import { Tooltip } from "react-tooltip";

interface ToolTipProps {
  children: ReactNode;
  id: string;
  style?: CSSProperties;
  color: "red" | "green" | "grey" | "blue" | "orange";
  content: string;
  className?: string;
  onClick?: () => void;
}

const CustomTooltip = ({
  children,
  id,
  color,
  style,
  content,
  className,
  onClick,
}: ToolTipProps) => {
  return (
    <div className={`tooltipContainer ${className} ${color}`} onClick={onClick}>
      <Tooltip
        id="my-tooltip-styles"
        anchorSelect={`#${id}`}
        className="myTooltip"
        style={style}
        content={content}
      />
      <div id={`${id}`} className={`tooltipChildren`}>
        {children}
      </div>
    </div>
  );
};

export default CustomTooltip;
