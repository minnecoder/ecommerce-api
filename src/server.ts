import http from "http";
import express, { Response } from "express";
import "./config/logging";

import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { server } from "./config/config";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
	logging.info("--------------------------------------------");
	logging.info("Initializing API");
	logging.info("--------------------------------------------");
	application.use(express.urlencoded({ extended: true }));
	application.use(express.json());

	logging.info("----------------------------------------------");
	logging.info("Logging and Configuration");
	logging.info("----------------------------------------------");
	application.use(loggingHandler);
	application.use(corsHandler);

	logging.info("----------------------------------------------");
	logging.info("Define Controller Routing");
	logging.info("----------------------------------------------");
	application.get("/healthcheck", (req, res: Response) => {
		return res.status(200).json({ message: "Server is running" });
	});

	logging.info("----------------------------------------------");
	logging.info("Define Routing Error");
	logging.info("----------------------------------------------");
	application.use(routeNotFound);

	logging.info("----------------------------------------------");
	logging.info("Start Server");
	logging.info("----------------------------------------------");
	httpServer = http.createServer(application);
	httpServer.listen(server.SERVER_PORT, () => {
		logging.info("----------------------------------------");
		logging.info(
			`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`,
		);
		logging.info("----------------------------------------");
	});
};

export const Shutdown = (callback: any) =>
	httpServer && httpServer.close(callback);

Main();
