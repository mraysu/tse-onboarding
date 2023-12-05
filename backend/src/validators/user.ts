import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name is required");
const makeProfilePictureURLValidator = () =>
  body("profilePictureURL").optional().isString().withMessage("profilePictureURL must be a string");

export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];
