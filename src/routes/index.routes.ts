import express from "express";
import customerRoutes from "./customer.routes";
import cartRoutes from "./cart.routes";
import productRoutes from "./product.routes";
const router = express.Router();

router.use("/customers", customerRoutes);
router.use("/carts", cartRoutes);
router.use("/products", productRoutes);
export default router;
