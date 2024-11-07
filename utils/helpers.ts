import { ZodError, ZodType } from "zod";
import { errorToast, successToast } from "../lib/toastify";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { UISelectOptionEvent } from "@/ui/uiselect";
import axios from "axios";
import { useAppDispatch } from "@/redux/store";
import { hideloader } from "@/redux/slice/loaderSlice";
export const handleApiError = (error: any) => {
  if (axios.isCancel(error)) return;

  if (error.response && error.response.data && error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error: any) => {
      errorToast(error.message);
    });
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    errorToast(error.response.data.message);
  } else if (error.response.data.error) {
    errorToast(error.response.data.error);
  } else {
    errorToast("Network Error");
  }
};


export const intlFormat = (val: number, locales?: string) =>
  new Intl.NumberFormat(locales ?? "en-IN").format(val);

export const parseInputType = (
  type: HTMLInputTypeAttribute | "list",
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | UISelectOptionEvent
) => {
  if (type === "checkbox" && "checked" in e.target) return e.target.checked;
  if (type === "number") return +e.target.value.trim();
  if (type === "file" && "files" in e.target) return e.target.files;
  if (type === "list") return e.target.value ?? [];
  return e.target.value.trim();
};

export const copyToClipboard = (val: string) => {
  if (!navigator.clipboard) return errorToast("Cannot copy!");
  navigator.clipboard.writeText(val);
  successToast("Coppied!");
};

interface ValidationResult<T> {
  data: T;
  errors?: {
    hasError: boolean;
    error: {
      [K in keyof T]?: string;
    };
  };
}
export const validateSchema = <T>(
  data: unknown,
  schema: ZodType<T, any, any>
): ValidationResult<T> => {
  try {
    const response = schema?.parse(data);

    return { data: response };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorState: {
        [K in keyof T]?: string;
      } = {};
      let hasError = false;
      error.errors.forEach(
        (err) => (errorState[err.path[0].toString() as keyof T] = err.message)
      );
      error.errors.length > 0 && (hasError = true);

      return { data: data as T, errors: { error: errorState, hasError } };
    }
    throw error;
  }
};

//!FormData
export const parseFormData = <T>(data: T) => {
  const formData = new FormData();
  if (typeof data !== "object" || !data) return formData;
  Object.keys(data).forEach((i) => {
    let elem = data[i as keyof typeof data] as string;
    elem !== undefined || (elem !== null && (elem = elem + ""));
    elem && formData.append(i, elem);
  });
  return formData;
};

export const to12HourFormat = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12; 

  return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};


export const formatDate = (date:Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function calculateDaysBetween(startDate: string, endDate: string): number {
  // Convert string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if the dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  // Calculate the difference in milliseconds
  const differenceInMs = end.getTime() - start.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return Math.ceil(differenceInDays); // Round up to ensure inclusive of both days
}


export const extractSpecificAddressParts = (address:string) => {
  const parts = address.split(','); 


  if (parts.length >= 3) {
    const middlePart = parts[1].trim(); // Part between first and second commas
    const afterSecondComma = parts[2].trim(); // Part after second comma (before the third comma)
    
    // Combine and return the desired parts
    return `${middlePart}, ${afterSecondComma}`;
  }

  // If there aren't enough parts, return the original address or handle the error
  return address;
};

export const floorLabel = (num:number) => {
  const suffix = (num === 1) ? "st" : (num === 2) ? "nd" : (num === 3) ? "rd" : "th";
  return `${Math.floor(num)}${suffix} floor`;
};
export const convertIncomingDateToNewDate=(incomingDateString:string)=> {
  const incomingDate = new Date(incomingDateString);
  const year = incomingDate.getUTCFullYear();
  const month = incomingDate.getUTCMonth(); 
  const day = incomingDate.getUTCDate();
  return new Date(year, month, day);
}



// 12hr time to 24hr format
export const convertTo24Hour=(time12h: any)=> {
 
  const [time, modifier] = time12h.split(' ');


  let [hours, minutes] = time.split(':');

  hours = parseInt(hours, 10);

 
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0; 
  }


  const hours24 = hours < 10 ? `0${hours}` : hours;

  return `${hours24}:${minutes}`;
}






