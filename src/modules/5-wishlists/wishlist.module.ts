import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wishlist, WishlistSchema } from "./schemas/wishlist.schema";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Wishlist.name,
				schema: WishlistSchema,
			},
		]),
	],
	controllers: [WishlistController],
	providers: [WishlistService],
	exports: [WishlistService],
})
export class WishlistModule {}
