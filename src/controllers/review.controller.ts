import { NextFunction, Request, Response } from "express";
import { Review } from "../models/review.model";

export async function getAllReviews(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const allReviews = await Review.find();
        return res.status(200).json({ data: allReviews });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getSingleReview(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const ReviewId = req.params.id;
        const findSingleReview = await Review.findOne({ _id: ReviewId });

        if (!findSingleReview) {
            return res
                .status(404)
                .json({ message: "Unable to find any data with that id" });
        }

        return res.status(200).json({ data: findSingleReview });
    } catch (error) {
        console.error("Error while finding review:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createReview(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const reviewData = req.body;
    try {
        const ReviewId = req.params.id;
        const checkExisting = await Review.findOne({ _id: ReviewId });
        if (checkExisting) {
            return res.status(400).json({ message: "Review already exists" });
        }
        const newReview = new Review(reviewData);
        await newReview.save();

        return res
            .status(201)
            .json({ message: "Review created successfully", data: newReview });
    } catch (error) {
        console.error("Error  creating review:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateReview(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const reviewId = req.params.id;
    const reviewFields = req.body;

    try {
        const updateReview = await Review.findByIdAndUpdate(
            { _id: reviewId },
            { $set: reviewFields },
            { new: true },
        );
        if (!updateReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        return res.status(200).json({
            message: "Review updated successfully",
            review: updateReview,
        });
    } catch (error) {
        console.error("Error updating review:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteReview(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const reviewId = req.params.id;
    try {
        const deletedReview = await Review.findOneAndDelete({ _id: reviewId });

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}
