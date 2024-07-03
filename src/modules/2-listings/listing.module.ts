import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListingController } from "./listing.controller";
import { ListingService } from "./listing.service";
import { Listing, ListingSchema } from "./schemas/listing.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Listing.name,
				schema: ListingSchema,
			},
		]),
	],
	controllers: [ListingController],
	providers: [ListingService],
	exports: [ListingService],
})
export class ListingModule {}
