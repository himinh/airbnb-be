import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListingModule } from "~modules/2-listings/listing.module";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Booking, BookingSchema } from "./schemas/booking.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Booking.name,
				schema: BookingSchema,
			},
		]),
		ListingModule,
	],
	controllers: [BookingController],
	providers: [BookingService],
	exports: [BookingService],
})
export class BookingModule {}
