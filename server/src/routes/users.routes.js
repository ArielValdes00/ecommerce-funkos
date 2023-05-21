import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser, getToken } from '../controllers/users.controller.js';

const router = Router();

router.post("/api/users", createUser);
router.get("/api/users", getUsers);
router.get("/api/users/:id", getUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);
router.post('/api/getuser', getToken) 

export default router;