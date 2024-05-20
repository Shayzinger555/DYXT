import { z } from "zod";

const israeliPhoneNumberRegex = /^05\d{8}$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
const numberString = /^\d+$/;
const Register = z.object({
  firstName: z.string().min(2),

  lastName: z.string().min(2),
  phone: z.string().regex(israeliPhoneNumberRegex, {
    message: "Invalid Israeli phone number",
  }),
  userName: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(7).max(12).regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.",
  }),
  country: z.string().min(1),
  city: z.string().min(1),
  userName: z.string().min(2).max(22),
  title: z.string().min(2).max(22),
});

export { Register };
