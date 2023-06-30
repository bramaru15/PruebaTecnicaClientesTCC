import express from "express";
import ClientController from "../controllers/ClientController";

const router = express.Router();

router.get("/client", new ClientController().getClients);
router.post("/client", new ClientController().createClient);
router.get("/client/:id", new ClientController().getClientById);
router.put("/client/:id", new ClientController().updateClient);
router.delete("/client/:id", new ClientController().deleteClientById);

export default router;