import express from "express";
import { createCoupon, applyCoupon, deleteCoupon , updateCoupon ,  getCoupons } from "../controllers/CouponController.js";

const router = express.Router();

router.get('/', getCoupons);

// Route pour créer un coupon (Admin uniquement)
router.post("/create", createCoupon);

// Route pour appliquer un coupon lors de l'achat
router.post("/apply", applyCoupon);

// Route pour supprimer un coupon (Admin uniquement)
router.delete("/supr/:id", deleteCoupon);

// Route pour mettre à jour un coupon
router.put('/modi/:id', updateCoupon);

export default router;
