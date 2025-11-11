import { bugService } from '../services/bug-service.js';

const VALID_SORT_FIELDS = [
  'title',
  'severity',
  'createdAt',
  '_id',
  'description',
];
const VALID_SORT_DIRS = ['asc', 'desc'];

function validateSortParams(sortBy, sortDir, res) {
  if (sortBy && !VALID_SORT_FIELDS.includes(sortBy)) {
    res.status(400).json({
      error: `Invalid sortBy field: ${sortBy}. Valid fields: ${VALID_SORT_FIELDS.join(
        ', '
      )}`,
    });
    return false;
  }

  if (sortDir && !VALID_SORT_DIRS.includes(sortDir)) {
    res.status(400).json({
      error: `Invalid sortDir: ${sortDir}. Valid values: ${VALID_SORT_DIRS.join(
        ', '
      )}`,
    });
    return false;
  }

  return true;
}

export function getBugs(req, res) {
  const { sortBy, sortDir } = req.query;

  if (!validateSortParams(sortBy, sortDir, res)) {
    return;
  }

  const bugs = bugService.findAll({ sortBy, sortDir });
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
