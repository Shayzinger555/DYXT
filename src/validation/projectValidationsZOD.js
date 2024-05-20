import { z } from "zod";

const Project = z.object({
  title: z.string().min(3),
  description: z.string().min(3).max(65),
});

export { Project };
