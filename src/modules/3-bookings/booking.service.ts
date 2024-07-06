import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { ListingService } from "~modules/2-listings/listing.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Booking, BookingDocument } from "./schemas/booking.schema";

@Injectable()
export class BookingService extends BaseService<BookingDocument> {
	private bookingService: BookingService;

	constructor(
		@InjectModel(Booking.name) model: Model<BookingDocument>,
		private readonly listingService: ListingService,
	) {
		super(model);

		this.bookingService = this;
	}

	async createBooking(input: CreateBookingDto) {
		const listing = await this.listingService.findById(input.listingId);

		if (!listing) throw new NotFoundException("Listing not found!");

		Object.assign(input, { totalPrice: listing.price });

		return this.bookingService.create(input);
	}
}
