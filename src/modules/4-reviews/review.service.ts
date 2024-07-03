import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Review, ReviewDocument } from "./schemas/review.schema";

@Injectable()
export class ReviewService extends BaseService<ReviewDocument> {
	constructor(@InjectModel(Review.name) model: Model<ReviewDocument>) {
		super(model);
	}
}
