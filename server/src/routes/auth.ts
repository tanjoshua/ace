import { Router } from "express";
import { body } from "express-validator";

import { DI } from "../index";
import {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";
import handleValidatorErrors from "../middleware/handleValidatorErrors";

const router = Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .custom((value) => {
        return DI.userRepository.findOne({ email: value }).then((user) => {
          return user
            ? Promise.reject("Email already in use")
            : Promise.resolve();
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  handleValidatorErrors,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  handleValidatorErrors,
  login
);

router.post("/logout", logout);

router.post(
  "/forgotPassword",
  [body("email").isEmail().normalizeEmail().withMessage("Enter a valid email")],
  forgotPassword
);

router.post(
  "/resetPassword",
  [
    body("token").notEmpty(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  resetPassword
);

export default router;
