import { z } from "zod";

function validateKey(object, schema) {
  try {
    const key = Object.keys(object)[0];
    const value = object[key];
    const partialSchema = z.object({ [key]: schema.shape[key] });
    const answer = partialSchema.parse({ [key]: value });
    return answer[key];
  } catch (error) {
    return error.errors[0].message;
  }
}
export default validateKey;
// todo fix imports for this function
