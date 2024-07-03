import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Gift, GiftDocument } from "./schemas/gift.schema";

@Injectable()
export class GiftService extends BaseService<GiftDocument> {
	constructor(@InjectModel(Gift.name) model: Model<GiftDocument>) {
		super(model);
	}
}
