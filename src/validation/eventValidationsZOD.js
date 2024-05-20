import { z } from "zod";
const Event = z.object({
  event: z.string().min(3),
});

export { Event };
