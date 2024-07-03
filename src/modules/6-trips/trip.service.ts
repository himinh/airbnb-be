import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Trip, TripDocument } from "./schemas/trip.schema";

@Injectable()
export class TripService extends BaseService<TripDocument> {
	constructor(@InjectModel(Trip.name) model: Model<TripDocument>) {
		super(model);
	}
}
