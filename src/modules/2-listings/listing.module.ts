import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListingController } from "./listing.controller";
import { ListingService } from "./listing.service";
import { Listing, ListingSchema } from "./schemas/listing.schema";
import { Wishlist, WishlistSchema } from "./schemas/wishlist.schema";
import { WishlistService } from "./wishlist.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Listing.name,
				schema: ListingSchema,
			},
			{
				name: Wishlist.name,
				schema: WishlistSchema,
			},
		]),
	],
	controllers: [ListingController],
	providers: [ListingService, WishlistService],
	exports: [ListingService],
})
export class ListingModule {}
