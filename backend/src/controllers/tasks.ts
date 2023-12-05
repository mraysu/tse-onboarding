import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    // Obtain a query of all tasks and sort descending
    const list = (await TaskModel.find({}).sort("-dateCreated")).forEach((task) => {
      // Populate assignee field, if it exists
      if (task.assignee !== null) {
        task.populate("assignee");
      }
    });

    // Successfully received all tasks. Set status 200 and body as a json list
    // of tasks.
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
