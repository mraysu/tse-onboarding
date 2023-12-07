import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (user === null) {
      throw createHttpError(404, "User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  // Validate the request
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body;

  try {
    // Throw any errors
    validationErrorParser(errors);

    // create new user
    const new_user = await UserModel.create({
      name: name,
      profilePictureURL: profilePictureURL,
    });

    res.status(201).json(new_user);
  } catch (error) {
    next(error);
  }
};
