import { bugService } from '../services/bug-service.js';

export function getBugs(_, res) {
  const bugs = bugService.findAll();
  res.json(bugs);
}

export function getBug(req, res) {
  const bug = bugService.findById(req.params.id);
  if (bug) {
    res.json(bug);
  } else {
    notFound(res);
  }
}

export function createBug(req, res) {
  const newBug = bugService.create(req.body);
  bugService.saveData();
  res.status(201).json(newBug);
}

export function updateBug(req, res) {
  const updatedBug = bugService.update(req.params.id, req.body);
  if (updatedBug) {
    bugService.saveData();
    res.json(updatedBug);
  } else {
    notFound(res);
  }
}

export function deleteBug(req, res) {
  const success = bugService.delete(req.params.id);
  if (success) {
    bugService.saveData();
    res.status(204).send();
  } else {
    notFound(res);
  }
}

export function downloadBugs(_, res) {
  const pdf = bugService.toPdf();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=bugs.pdf');
  pdf.pipe(res);
  pdf.end();
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
  downloadBugs,
};
