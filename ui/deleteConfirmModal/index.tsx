import React from "react";
import UIModal from "../uimodal";
import UIButton from "../uibutton";

interface DeleteConfirmProps {
  onClose: () => void;
}

const DeleteConfirm = ({ onClose }: DeleteConfirmProps) => {
  return (
    <UIModal onClose={onClose}>
      <div className="confirmDelete">
        <h1>Confirm Delete?</h1>
        <div className="btns">
          <UIButton type="secondary" label="Cancel" />
          <UIButton type="primary" label="Confirm" />
        </div>
      </div>
    </UIModal>
  );
};

export default DeleteConfirm;
