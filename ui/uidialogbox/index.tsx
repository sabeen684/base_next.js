import UIButton from "@/ui/uibutton";
import UIModal from "@/ui/uimodal";

export interface UIDialogBoxProps {
  cancel: () => void;
  confirm: () => void;
  title: string;
  message: string;
  cancelName?: string;
  confirmName?: string;
}
export default function UIDialogBox({
  cancel,
  confirm,
  message,
  title,
  cancelName,
  confirmName,
}: UIDialogBoxProps) {
  return (
    <UIModal onClose={cancel} showAnimation>
      <div className="dialogbox">
        <h2 className="dialogbox-heading">{title}</h2>
        <p className="dialogbox-message">{message}</p>
        <div className="dialogbox-actions">
          <UIButton
            label={confirmName ?? "Confirm"}
            type="primary"
            className="dialogbox-actions--btn"
            onClick={confirm}
          />
          <UIButton
            label={cancelName ?? "Cancel"}
            type="secondary"
            className="dialogbox-actions--btn cancel duotone"
            onClick={cancel}
          />
        </div>
      </div>
    </UIModal>
  );
}
