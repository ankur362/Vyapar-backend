import { Router } from "express";
import { 
    registerDealer, 
    loginDealer, 
    registerBusiness, 
    updateBusinessDetails,
    deleteDealer, 
    getCustomerByName,
    getCustomerById,
    getTotalBill,
    getOutstandingBill
} from "../controllers/dealer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerDealer);
router.post("/login", loginDealer);

// Protected routes
router.post("/business-register", verifyJWT, registerBusiness);
router.put("/business-update", verifyJWT, updateBusinessDetails);
router.delete("/delete", verifyJWT, deleteDealer);
router.post("/get-by-name",verifyJWT,getCustomerByName)
router.post("/get-by-id",verifyJWT,getCustomerById)
router.get("/outstanding-bill", verifyJWT, getOutstandingBill);
router.get("/total-bill", verifyJWT, getTotalBill);

export default router;