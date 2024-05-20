import { Savings } from "@mui/icons-material";
import { z } from "zod";

const Report = z.object({
  main: z.number().min(1),
  investments: z.number().min(1),
  savings: z.number().min(1),
});
export { Report };
