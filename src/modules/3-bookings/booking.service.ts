import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Booking, BookingDocument } from "./schemas/booking.schema";

@Injectable()
export class BookingService extends BaseService<BookingDocument> {
	constructor(@InjectModel(Booking.name) model: Model<BookingDocument>) {
		super(model);
	}
}
