import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Listing, ListingDocument } from "./schemas/listing.schema";
import { WishlistService } from "./wishlist.service";

@Injectable()
export class ListingService extends BaseService<ListingDocument> {
	private listingService: ListingService;

	constructor(
		@InjectModel(Listing.name) model: Model<ListingDocument>,
		private readonly wishlistService: WishlistService,
	) {
		super(model);
		this.listingService = this;
	}

	async increaseReview(
		listingId: Types.ObjectId,
		input: {
			rating: number;
			amount: number;
		},
	) {
		return this.listingService.updateById(listingId, {
			$inc: { reviewCount: input.amount, totalReviewRatings: input.rating },
		});
	}

	async addToWishlist(userId: Types.ObjectId, listingId: Types.ObjectId) {
		return this.wishlistService.create({ userId, listingId });
	}

	async removeFromWishlist(userId: Types.ObjectId, listingId: Types.ObjectId) {
		return this.wishlistService.deleteOne({ userId, listingId });
	}
}
