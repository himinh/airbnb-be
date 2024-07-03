import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Listing, ListingDocument } from "./schemas/listing.schema";

@Injectable()
export class ListingService extends BaseService<ListingDocument> {
	constructor(@InjectModel(Listing.name) model: Model<ListingDocument>) {
		super(model);
	}
}
