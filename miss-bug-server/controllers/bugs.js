import Bug from '../models/bug.js';

export function getBugs(_, res) {
  const bugs = Bug.findAll();
  res.json(bugs);
}

export function getBug(req, res) {
  console.log('🚀 ~ getBug ~ req:', req);
  const bug = Bug.findById(req.params.id);
  if (bug) {
    res.json(bug);
  } else {
    notFound(res);
  }
}

export function createBug(req, res) {
  const newBug = Bug.create(req.body);
  Bug.saveData();
  res.status(201).json(newBug);
}

export function updateBug(req, res) {
  const updatedBug = Bug.update(req.params.id, req.body);
  if (updatedBug) {
    Bug.saveData();
    res.json(updatedBug);
  } else {
    notFound(res);
  }
}

export function deleteBug(req, res) {
  const success = Bug.delete(req.params.id);
  if (success) {
    Bug.saveData();
    res.status(204).send();
  } else {
    notFound(res);
  }
}

function notFound(res) {
  res.status(404).send('Not Found');
}

export default {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
};
