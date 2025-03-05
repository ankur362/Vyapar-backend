import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCustomer, deleteCustomer, updateCustomer } from "../controllers/customer.controller.js";
const router = Router();
router.post("/customer-register", verifyJWT, createCustomer);
router.put("/customer-register", verifyJWT, updateCustomer);
router.delete("/customer-delete", verifyJWT, deleteCustomer);
router.post("/customer-register", verifyJWT, createCustomer);






export default router;