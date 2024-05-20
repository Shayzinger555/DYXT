import { z } from "zod";

const Todo = z.object({
  todo: z.string().min(2),
});
export { Todo };
