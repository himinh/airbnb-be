import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListingModule } from "~modules/2-listings/listing.module";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { Review, ReviewSchema } from "./schemas/review.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Review.name,
				schema: ReviewSchema,
			},
		]),
		ListingModule,
	],
	controllers: [ReviewController],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}
