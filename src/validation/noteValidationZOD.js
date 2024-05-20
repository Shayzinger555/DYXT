import { z } from "zod";

const Note = z.object({
  note: z.string().min(2),
});
export { Note };
