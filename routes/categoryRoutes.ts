import express from 'express';

import categoryController from '../app/controllers/categoryController.ts';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/create', categoryController.createCategories);
router.put('/:id', categoryController.updateCategories);

export default router;
