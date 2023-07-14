const Task = require("../models/task");

async function getTasksByUser(userId) {
  try {
    return await Task.find({ user: userId });
  } catch (error) {
    console.log("getTasksByUser error", error);
    throw error;
  }
}

async function updateTask(taskId, task) {
  try {
    return await Task.findByIdAndUpdate(
      taskId,
      { ...task },
      {
        returnDocument: "after",
      }
    );
  } catch (error) {
    console.log("updateTask error", error);
    throw error;
  }
}

async function addTask(task) {
  try {
    const newTask = new Task(task);
    return await newTask.save();
  } catch (error) {
    console.log("addTask error", error);
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    await Task.findByIdAndDelete(taskId);
    return taskId;
  } catch (error) {
    console.log("deleteTask error", error);
    throw error;
  }
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  getTasksByUser,
};
