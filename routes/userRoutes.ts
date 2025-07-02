import express from 'express';

import userController from '../app/controllers/userController.ts';

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/create', userController.createUsers);
router.put('/:id', userController.updateUsers);
router.delete('/delete/:id', userController.deleteUsers);

export default router;
