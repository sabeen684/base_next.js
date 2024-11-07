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
    value: string;
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
  defaultValue?: string;
  disabled?: boolean;
  showSearch?: boolean;
  instruction?: string;
  zindex?: number;
}

export default function UISelect({
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
  defaultValue,
  disabled,
  showSearch,
  instruction,
  zindex,
}: TUISelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
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

  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
    const selectedOption = filteredOptions[index];
    onChange &&
      onChange({
        target: {
          name: name ?? "SelectField",
          value: selectedOption.value,
          required: isRequired ?? false,
          type: "text",
        },
      });

    toggleShow(false);
  };

  const handleDisplayEvent = () => {
    !disabled && toggleShow(!show);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (show && filteredOptions.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentIndex =
          selectedOptionIndex !== null ? selectedOptionIndex : -1;
        let newIndex = currentIndex;
        if (e.key === "ArrowDown") {
          newIndex = (currentIndex + 1) % filteredOptions.length;
        } else {
          newIndex =
            currentIndex > 0 ? currentIndex - 1 : filteredOptions.length - 1;
        }
        setSelectedOptionIndex(newIndex);
      } else if (e.key === "Enter") {
        if (selectedOptionIndex !== null) {
          handleOptionSelect(selectedOptionIndex);
        }
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
    <div className="selectfield" style={style} ref={wrapperRef}>
      {label ? (
        <label
          htmlFor={id ? id : ""}
          className="selectfield-label"
          onClick={handleDisplayEvent}
          tabIndex={1}
        >
          {label}
          <span>{isRequired ? "*" : ""}</span>
        </label>
      ) : null}

      <div className="selectfield-wrapper">
        {!show || !showSearch ? (
          <div
            className={`selectfield-display ${error ? "error" : ""}`}
            onClick={handleDisplayEvent}
            onKeyDown={handleKeyDown}
            tabIndex={1}
          >
            <div className="selectfield-display--wrapper">
              {prefix ? (
                <div className="selectfield-display--prefix">{prefix}</div>
              ) : (
                ""
              )}
              <div className="selectfield-display--value">
                {selectedOptionIndex !== null &&
                filteredOptions[selectedOptionIndex]
                  ? filteredOptions[selectedOptionIndex].displayValue ??
                    filteredOptions[selectedOptionIndex].value
                  : defaultValue &&
                    options.find((i) => i.value === defaultValue)
                  ? options.find((i) => i.value === defaultValue)
                      ?.displayValue ??
                    options.find((i) => i.value === defaultValue)?.value
                  : placeholder ??
                    (options[0]
                      ? options[0].displayValue ?? options[0].value
                      : "Select")}
              </div>
            </div>
            <i className="fa-regular fa-chevron-down selectfield-display--arrow"></i>
          </div>
        ) : (
          <div className={`selectfield-search ${error ? "error" : ""}`}>
            <div className="selectfield-search--wrapper">
              <div className="selectfield-search--prefix">
                <i className="fa-regular fa-search"></i>
              </div>
              <input
                type="text"
                autoFocus={true}
                placeholder="Search.."
                className="selectfield-search--input"
                onChange={handleSearch}
              />
            </div>
            <i
              className="fa-regular fa-times selectfield-search--arrow"
              onClick={() => toggleShow(false)}
            ></i>
          </div>
        )}
      </div>

      {
        show && (
          // ReactDOM.createPortal(
          <div
            className="selectfield-options"
            // style={dropdownStyle}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={optionsRef}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((child, index) => {
                return (
                  <div
                    className={`selectfield-options--item ${
                      index === selectedOptionIndex ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    key={child.value}
                  >
                    {child.displayValue ? child.displayValue : child.value}
                  </div>
                );
              })
            ) : (
              <div className="selectfield-blank">No Options Found</div>
            )}
          </div>
        )
        //     ,
        //     document.body
        //   )
        // : null
      }

      {error ? <span className="selectfield-error">{error}</span> : null}

      {instruction ? (
        <p className="inputfield-instruction">{instruction}</p>
      ) : null}
    </div>
  );
}
