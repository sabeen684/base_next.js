"use client";
import File from "@/public/file.png";
import Image from "next/image";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import UIButton from "../uibutton";

interface UIFileListInputProps {
  id?: string;
  label?: string | ReactNode;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultValue?: string | number | null;
  instruction?: string;
  subtitle?: string;
  multiple?: boolean;
  accept?: string;
}
export default function UIFileListInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  onChange,
  error,
  subtitle,
  instruction,
  multiple,
  accept,
}: UIFileListInputProps) {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length < 1) return;

    const existingFilesArray = fileList ? Array.from(fileList) : [];

    const combinedFiles = existingFilesArray.concat(Array.from(files));

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((file) => dataTransfer.items.add(file));

    setFileList(dataTransfer.files);
    onChange &&
      onChange({
        target: {
          name: name ?? "File Input",
          files: dataTransfer.files,
          required: isRequired ?? false,
          type: "file",
        },
      } as ChangeEvent<HTMLInputElement>);
  };
  const handleFileDelete = (item: keyof FileList) => {
    const files = (fileList ? Array.from(fileList) : []).filter(
      (_, index) => index !== item
    );

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    setFileList(dataTransfer.files);
    onChange &&
      onChange({
        target: {
          name: name ?? "File Input",
          files: dataTransfer.files,
          required: isRequired ?? false,
          type: "file",
        },
      } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="filelistinput" style={style}>
      {label ? (
        <label htmlFor={id ? id : ""} className="filelistinput-label">
          {label} <span className="required">{isRequired ? "*" : ""}</span>
        </label>
      ) : null}
      {subtitle ? (
        <p className="filelistinput-instruction">{subtitle}</p>
      ) : null}
      <div className={`filelistinput-input ${error ? "error" : ""}`}>
        {!multiple && fileList?.length === 1 ? null : (
          <div className="filelistinput-input--add">
            <i className="fa-solid fa-folder-arrow-up"></i>
            <span>
              {placeholder
                ? placeholder
                : fileList && fileList?.length > 0
                ? fileList?.length + " Items Selected"
                : "Drag your file(s) to start uploading"}
            </span>
            <div className="filelistinput-input--add_orline">
              <hr className="filelistinput-input--add_orline__line" />
              <div className="filelistinput-input--add_orline__text">OR</div>
              <hr className="filelistinput-input--add_orline__line" />
            </div>
            <UIButton
              label="Browse Files"
              type="secondary"
              style={{
                fontSize: "0.7rem",
                height: "2rem",
                width: "max-content",
              }}
            />
            <input
              type={"file"}
              onChange={handleFileChange}
              id={id}
              name={name}
              required={isRequired}
              multiple={multiple}
              accept={accept}
            />
          </div>
        )}
        {fileList &&
          Object.values(fileList).map((item, index) => (
            <div className="filelistinput-input--image" key={index}>
              <i
                className="fa-regular fa-times"
                onClick={() => handleFileDelete(index)}
              ></i>
              <Image
                unoptimized
                key={index}
                src={
                  item.type.indexOf("image/") > -1
                    ? URL.createObjectURL(item)
                    : File
                }
                alt={item.name}
                width={1000}
                height={1000}
                quality={25}
              />
            </div>
          ))}
      </div>

      {error ? <span className="filelistinput-error">{error}</span> : null}

      {instruction ? (
        <p className="filelistinput-instruction">{instruction}</p>
      ) : null}
    </div>
  );
}
