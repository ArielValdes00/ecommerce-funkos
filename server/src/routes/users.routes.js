import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser, getToken, login, requestPasswordReset, resetPassword, assignAdminRole } from '../controllers/users.controller.js';

const router = Router();

router.post("/api/users", createUser);
router.post("/api/users/login", login);
router.get("/api/users", getUsers);
router.get("/api/users/:id", getUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);
router.post("/api/users/assign-admin-role/:id", assignAdminRole);
router.post("/api/getuser", getToken);
router.post("/api/users/request-password-reset", requestPasswordReset);
router.post("/api/users/reset-password", resetPassword);

export default router;