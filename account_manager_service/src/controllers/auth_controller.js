import supabase from "../config/supabase.js";
import { responseError } from "../utils/error-function.js";
import { responseSuccess } from "../utils/function.js";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await supabase.auth.signUp({
      email,
      password,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.error) {
      responseError(401, "Username or account is incorrect");
    }

    const result = {
      id: data.data.user.id,
      email: data.data.user.email,
      token: data.data.session.access_token,
      expires: `${data.data.session.expires_in / 1000} hours`,
    };

    responseSuccess(res, "Login Success", result);
  } catch (e) {
    next(e);
  }
};

export default { signup, login };
