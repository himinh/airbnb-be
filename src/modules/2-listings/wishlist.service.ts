import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "~base-inherit/base.service";
import { Wishlist, WishlistDocument } from "./schemas/wishlist.schema";

@Injectable()
export class WishlistService extends BaseService<WishlistDocument> {
	constructor(@InjectModel(Wishlist.name) model: Model<WishlistDocument>) {
		super(model);
	}
}
