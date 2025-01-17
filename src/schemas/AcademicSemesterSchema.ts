import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a name" }).nonempty(),
  year: z.string({ required_error: "Please select a year" }).nonempty(),
  startMonth: z.string({ required_error: "Please select a start month" }).nonempty(),
  endMonth: z.string({ required_error: "Please select an end month" }).nonempty(),
})