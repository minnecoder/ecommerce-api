// import all of the controllers for the route
import { Router } from "express";

const router = Router();

router.get("/customers", getCustomersController);
