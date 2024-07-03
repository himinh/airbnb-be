import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GiftController } from "./gift.controller";
import { GiftService } from "./gift.service";
import { Gift, GiftSchema } from "./schemas/gift.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Gift.name,
				schema: GiftSchema,
			},
		]),
	],
	controllers: [GiftController],
	providers: [GiftService],
	exports: [GiftService],
})
export class GiftModule {}
