import { Router } from "express";
import { body } from "express-validator";

import { DI } from "../index";
import { login, register } from "../controllers/auth";
import handleValidatorErrors from "../middleware/handleValidatorErrors";

const router = Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .custom((value) => {
        return DI.userRepository.findOne({ email: value }).then((user) => {
          return user
            ? Promise.reject("Email already in use")
            : Promise.resolve();
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().notEmpty(),
  ],
  handleValidatorErrors,
  register
);

router.post("/login", login);

export default router;
