import { NextFunction, Request, Response } from "express";
import { Session } from "../models/session.model";

export async function getAllSessions(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const allSessions = await Session.find();
        return res.status(200).json({ data: allSessions });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getSingleSession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const SessionId = req.params.id;
        const findSingleSession = await Session.findOne({ _id: SessionId });

        if (!findSingleSession) {
            return res
                .status(404)
                .json({ message: "Unable to find any data with that id" });
        }

        return res.status(200).json({ data: findSingleSession });
    } catch (error) {
        console.error("Error while finding session:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createSession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const sessionData = req.body;
    try {
        const SessionId = req.params.id;
        const checkExisting = await Session.findOne({ _id: SessionId });
        if (checkExisting) {
            return res.status(400).json({ message: "Session already exists" });
        }
        const newSession = new Session(sessionData);
        await newSession.save();

        return res
            .status(201)
            .json({ message: "Session created successfully", data: newSession });
    } catch (error) {
        console.error("Error  creating session:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateSession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const sessionId = req.params.id;
    const sessionFields = req.body;

    try {
        const updateSession = await Session.findByIdAndUpdate(
            { _id: sessionId },
            { $set: sessionFields },
            { new: true },
        );
        if (!updateSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        return res.status(200).json({
            message: "Session updated successfully",
            session: updateSession,
        });
    } catch (error) {
        console.error("Error updating session:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteSession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const sessionId = req.params.id;
    try {
        const deletedSession = await Session.findOneAndDelete({ _id: sessionId });

        if (!deletedSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        return res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        console.error("Error deleting session:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}
