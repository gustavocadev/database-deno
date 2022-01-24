import { Router } from "https://deno.land/x/oak/mod.ts";
import { createUser, deleteUser, updateUser } from "../controllers/users.controllers.ts";

const router = new Router();

// Creamos un nuevo usuario
router.post("/users/new-user", createUser);

// Elinamos un usuario
router.post("/users/delete/:id", deleteUser);

// Actualizamos usuario
router.post('/users/update/:id', updateUser)


export default router