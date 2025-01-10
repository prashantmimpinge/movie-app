import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  publishingYear: z.string(),
});
