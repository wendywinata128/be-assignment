import supabase from "../config/supabase.js";
import { responseErrorUnauthorized } from "../utils/error-function.js";

export default async function authenticated(req, res, next) {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return responseErrorUnauthorized();
    }

    const [, token] = auth.split(" ");

    const { data: {user}, error } = await supabase.auth.getUser(token);

    if (error) {
      return responseErrorUnauthorized();
    }

    req.user = user;

    next();
  } catch(e) {
    next(e)
  }
}
