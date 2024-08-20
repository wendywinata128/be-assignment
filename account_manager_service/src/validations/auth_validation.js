import { body } from "express-validator";

// route => /login
export function loginValidation() {
  return [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("password").isLength({ min: 5 }),
  ];
}

// route => /signup
export function signupValidation() {
    return [
      body("email").notEmpty(),
      body("email").isEmail(),
      body("password").notEmpty(),
      body("password").isLength({ min: 5 }),
    ];
  }
