import { CSSProperties, ReactNode, useRef } from "react";
import CustomTooltip from "../uiTooltip";

interface UIModalProps {
  children?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
  showAnimation?: boolean;
}

export default function UIModal({
  children,
  onClose,
  style,
  showAnimation = true,
}: UIModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleCancel = () => {
    if (!showAnimation) return onClose?.();
    modalRef.current?.classList.add("hide");
    setTimeout(() => onClose?.(), 700);
  };
  return (
    <div className="uimodal">
      <div className="uimodal-overlay"></div>
      <div className="uimodal-content" style={style} ref={modalRef}>
        <div className="uimodal-content--cross" onClick={handleCancel}>
          <CustomTooltip
            id="close"
            content="close"
            color="red"
            className="tooltip"
          >
            <i className="fa-regular fa-times"></i>
          </CustomTooltip>
        </div>
        {children}
      </div>
    </div>
  );
}
