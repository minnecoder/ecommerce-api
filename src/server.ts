import http from "http";
import express, { Response } from "express";
import "./config/logging";
import routes from "./routes/index.routes";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { server } from "./config/config";
import mongoose from "mongoose";
import "dotenv";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
	application.use(express.urlencoded({ extended: true }));
	application.use(express.json());

	application.use(loggingHandler);
	application.use(corsHandler);

	application.get("/healthcheck", (req, res: Response) => {
		return res.status(200).json({ message: "Server is running" });
	});

	application.use("/api", routes);
	application.use(routeNotFound);

	mongoose.connect(process.env.MONGO_URI || "");

	httpServer = http.createServer(application);
	httpServer.listen(server.SERVER_PORT, () => {
		logging.info(
			`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`,
		);
	});
};

export const Shutdown = (callback: any) =>
	httpServer && httpServer.close(callback);

Main();
