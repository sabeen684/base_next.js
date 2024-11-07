import { z } from "zod";
import { emailField, stringField } from "./global.schema";

export const loginSchema = z.object({
    email:emailField("E-Mail"),
    password:stringField("Password",8,10)
})