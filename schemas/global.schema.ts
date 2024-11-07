import { z, ZodType } from "zod";

export const positiveNumberField = (
  val: string,
  min?: number, 
  max?: number   
) =>
  z
    .number({
      required_error: `${val} is required`,
      invalid_type_error: `Provide valid type`,
    })
    .refine((value) => (min === undefined || value >= min), {
      message: `Must be greater than or equal to ${min}`,
    })
    .refine((value) => (max === undefined || value <= max), {
      message: `Must be less than or equal to ${max}`,
    });

export const percentageField = (val: string) =>
  z
    .number({
      required_error: `${val} is required`,
      invalid_type_error: `Provide a valid number for ${val}`,
    })
    .min(0, { message: `${val} must be greater than or equal to 0` })
    .max(100, { message: `${val} must be less than or equal to 100` });


export const emailField = (val: string) =>
  z
    .string({
      required_error: `${val} is required`,
      invalid_type_error: "Provide valid type",
    })
    .min(1, { message: `${val} is required` })
    .email("Invalid email address");

export const stringField = (val: string, min: number = 1, max: number = 10) =>
  z
    .string({
      required_error: `${val} is required`,
      invalid_type_error: "Provide valid type",
    })
    .min(min, { message: `${val} must be ${min} in length` });


    export const NumberField = (val: string) =>
      z.coerce.number({
        required_error: `${val} is required`,
        invalid_type_error: "Provide a valid number",  
      });

export const phoneField = (val: string, min?: number, max?: number) =>
  z
    .string({
      required_error: `${val} is required`,
      invalid_type_error: "Provide valid type",
    })
    .refine((val) => min && val.length >= min, {
      message: `${val} must be at least ${min} digits`,
    })
    .refine((val) => max && val.length <= max, {
      message: `${val} must be at most ${max} digits`,
    });

export const booleanField = (val: string, min: number = 1) =>
  z.boolean({
    required_error: `${val} is required`,
    invalid_type_error: "Provide valid type",
  });

export const enumField = (val: any, name: string) =>
  z.enum(val, {
    required_error: `${name} is required`,
    invalid_type_error: "Provide valid type",
  });

export const optionalStringField = z
  .string({ invalid_type_error: "Provide valid type" })
  .optional()
  .nullable();
export const optionalNumberField = z
  .number({ invalid_type_error: "Provide valid type" })
  .optional()
  .nullable();
export const optionalBooleanField = z
  .boolean({ invalid_type_error: "Provide valid type" })
  .optional()
  .nullable();

export const passwordField = (val: string, min?: number, max?: number) =>
  z
    .string({
      required_error: `${val} is required`,
      invalid_type_error: "Provide a valid type",
    })
    .refine((val) => !min || val.length >= min, {
      message: `${val} must be at least ${min} characters long`,
    })
    .refine((val) => !max || val.length <= max, {
      message: `${val} must be at most ${max} characters long`,
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: `${val} must contain at least one uppercase letter`,
    })
    .refine((val) => /[a-z]/.test(val), {
      message: `${val} must contain at least one lowercase letter`,
    })
    .refine((val) => /[0-9]/.test(val), {
      message: `${val} must contain at least one number`,
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: `${val} must contain at least one special character`,
    });

export type GetInferedType<T extends ZodType> = z.infer<T>;


