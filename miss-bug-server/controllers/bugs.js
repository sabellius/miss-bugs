import Bug from "../models/bug.js";

export function getBugs(_, res) {
  const bugs = Bug.findAll();
  console.log("🚀 ~ getBugs ~ bugs:", bugs);
  res.json(bugs);
}

export function getBug(req, res) {
  const bug = Bug.findById(req.params.id);
  if (bug) {
    res.json(bug);
  } else {
    notFound(res);
  }
}

export function createBug(req, res) {
  const newBug = Bug.create(req.body);
  res.status(201).json(newBug);
}

export function updateBug(req, res) {
  const updatedBug = Bug.update(req.params.id, req.body);
  if (updatedBug) {
    res.json(updatedBug);
  } else {
    notFound(res);
  }
}

export function deleteBug(req, res) {
  const success = Bug.delete(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    notFound(res);
  }
}

function notFound(res) {
  res.status(404).send("Not Found");
}

export default {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
};
