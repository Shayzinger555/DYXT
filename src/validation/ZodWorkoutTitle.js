
import { z } from "zod";

const workoutTitle = z.object({
  title: z.string().min(2),

});
export { workoutTitle };
