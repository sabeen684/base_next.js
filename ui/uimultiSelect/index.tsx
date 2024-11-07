"use client";
import React, {
  CSSProperties,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export interface UISelectOptionEvent {
  target: {
    name: string;
    value: string[];
    required: boolean;
    type: "text";
  };
}

export interface UISelectOption {
  value: string;
  displayValue?: ReactNode;
  search?: string;
}

interface TUISelectProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  error?: string;
  prefix?: ReactNode | string;
  onChange?: (data: UISelectOptionEvent) => void;
  options: UISelectOption[];
  defaultValue?: string[];
  disabled?: boolean;
  showSearch?: boolean;
  instruction?: string;
  zindex?: number;
}

export default function UIMultipleSelect({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  error,
  prefix,
  onChange,
  options,
  defaultValue = [],
  disabled,
  showSearch,
  instruction,
  zindex,
}: TUISelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValue);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (show && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: zindex ?? 10,
      });
    }
  }, [show, zindex]);

  const [keyword, setKeyword] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] =
    useState<UISelectOption[]>(options);

  const toggleShow = (val: boolean) => setShow(val);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword ? keyword.trim() : null);
  };

  const handleOptionSelect = (value: string) => {
    const isSelected = selectedOptions.includes(value);
    const updatedSelectedOptions = isSelected
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedSelectedOptions);

    onChange &&
      onChange({
        target: {
          name: name ?? "SelectField",
          value: updatedSelectedOptions,
          required: isRequired ?? false,
          type: "text",
        },
      });
  };

  const handleDisplayEvent = () => {
    !disabled && toggleShow(!show);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (show && filteredOptions.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        wrapperRef.current &&
        typeof wrapperRef.current === "object" &&
        !wrapperRef.current.contains(e.target as Node | null) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node | null)
      ) {
        toggleShow(false);
        setFilteredOptions(options);
      }
    });
    return () => {
      document.removeEventListener("mousedown", () => null);
    };
  }, [wrapperRef, optionsRef, options]);

  useEffect(() => {
    let searchTimeout: NodeJS.Timeout | number | undefined;
    if (keyword) {
      searchTimeout = setTimeout(() => {
        setFilteredOptions(
          options.filter(
            (i) =>
              (i.search ?? i.value)
                .toLowerCase()
                .indexOf(keyword.toLowerCase()) > -1
          )
        );
      }, 500);
    } else {
      setFilteredOptions(options);
    }

    return () => {
      clearTimeout(searchTimeout ? searchTimeout : undefined);
    };
  }, [keyword, options]);

  return (
    <div className="multiselectfields" style={style} ref={wrapperRef}>
      {label ? (
        <label
          htmlFor={id ? id : ""}
          className="multimultiselectfields-label"
          onClick={handleDisplayEvent}
          tabIndex={1}
        >
          {label}
          <span>{isRequired ? "*" : ""}</span>
        </label>
      ) : null}

      <div className="multiselectfields-wrapper">
        {!show || !showSearch ? (
          <div
            className={`multiselectfields-display ${error ? "error" : ""}`}
            onClick={handleDisplayEvent}
            onKeyDown={handleKeyDown}
            tabIndex={1}
          >
            <div className="multiselectfields-display--wrapper">
              {prefix ? (
                <div className="multiselectfields-display--prefix">{prefix}</div>
              ) : (
                ""
              )}
              <div className="multiselectfields-display--value">
                {selectedOptions.length > 0
                  ? selectedOptions
                      .map(
                        (value) =>
                          options.find((opt) => opt.value === value)
                            ?.displayValue ?? value
                      )
                      .join(", ")
                  : placeholder ??
                    (options[0]
                      ? options[0].displayValue ?? options[0].value
                      : "Select")}
              </div>
            </div>
            <i className="fa-regular fa-chevron-down multiselectfields-display--arrow"></i>
          </div>
        ) : (
          <div className={`multiselectfields-search ${error ? "error" : ""}`}>
            <div className="multiselectfields-search--wrapper">
              <div className="multiselectfields-search--prefix">
                <i className="fa-regular fa-search"></i>
              </div>
              <input
                type="text"
                autoFocus={true}
                placeholder="Search.."
                className="multiselectfields-search--input"
                onChange={handleSearch}
              />
            </div>
            <i
              className="fa-regular fa-times multiselectfields-search--arrow"
              onClick={() => toggleShow(false)}
            ></i>
          </div>
        )}
      </div>

      {show && (
        <div
          className="multiselectfields-options"
        //   style={dropdownStyle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={optionsRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((child) => {
              const isSelected = selectedOptions.includes(child.value);
              return (
                <div
                  className={`multiselectfields-options--item ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(child.value)}
                  key={child.value}
                >
                  {child.displayValue ? child.displayValue : child.value}
                  {isSelected && <i className="fa-regular fa-check"></i>}
                </div>
              );
            })
          ) : (
            <div className="multiselectfields-blank">No Options Found</div>
          )}
        </div>
      )}

      {error ? <span className="multiselectfields-error">{error}</span> : null}

      {instruction ? (
        <p className="inputfield-instruction">{instruction}</p>
      ) : null}
    </div>
  );
}
