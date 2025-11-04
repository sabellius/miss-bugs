import express from 'express';
import bugsController from '../controllers/bugs.js';

const router = express.Router();

router.get('/', bugsController.getBugs);
router.get('/download', bugsController.downloadBugs);
router.get('/:id', bugsController.getBug);
router.post('/', bugsController.createBug);
router.put('/:id', bugsController.updateBug);
router.delete('/:id', bugsController.deleteBug);

export default router;
