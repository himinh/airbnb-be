import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { ListingService } from "~modules/2-listings/listing.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review, ReviewDocument } from "./schemas/review.schema";

@Injectable()
export class ReviewService extends BaseService<ReviewDocument> {
	private reviewService: ReviewService;

	constructor(
		@InjectModel(Review.name) model: Model<ReviewDocument>,
		private readonly listingService: ListingService,
	) {
		super(model);

		this.reviewService = this;
	}

	async createReview(input: CreateReviewDto) {
		// Update listing review
		const listing = await this.listingService.increaseReview(input.listingId, {
			amount: 1,
			rating: input.rating,
		});

		if (!listing) throw new NotFoundException("Listing not found!");

		return this.reviewService.create(input);
	}

	async updateReviewById(reviewId: Types.ObjectId, input: UpdateReviewDto) {
		const updated = await this.reviewService.updateOne(
			{
				_id: reviewId,
				userId: input.userId,
			},
			input,
			{ new: false },
		);

		if (!updated) throw new NotFoundException("Review not found!");

		// Update listing review
		if (input.rating) {
			const ratingChange = input.rating - updated.rating;

			this.listingService
				.increaseReview(updated.listingId, {
					amount: 0,
					rating: ratingChange,
				})
				.catch(() => {});
		}

		return {
			...updated.toObject(),
			...input,
		};
	}

	async deleteReviewById(reviewId: Types.ObjectId) {
		const deleted = await this.reviewService.deleteById(reviewId);

		if (!deleted) throw new NotFoundException("Review not found!");

		// Update listing review
		this.listingService
			.increaseReview(deleted.listingId, {
				amount: -1,
				rating: -deleted.rating,
			})
			.catch(() => {});

		return deleted;
	}
}
