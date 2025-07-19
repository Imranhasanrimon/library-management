import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowController.borrowABook)
borrowRoute.get("/", borrowController.bookSummary)


export default borrowRoute;