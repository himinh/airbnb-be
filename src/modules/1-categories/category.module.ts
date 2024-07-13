import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListingModule } from "~modules/2-listings/listing.module";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category, CategorySchema } from "./schemas/category.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Category.name,
				schema: CategorySchema,
			},
		]),
		ListingModule,
	],
	controllers: [CategoryController],
	providers: [CategoryService],
	exports: [CategoryService],
})
export class CategoryModule {}
