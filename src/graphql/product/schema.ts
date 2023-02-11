import { ArgsType, Field, ObjectType } from "type-graphql";
import { Matches } from "class-validator";

const UUIDFormat =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

@ObjectType()
export class Product {
  @Field()
    id!: string;
  @Field()
    owner_username!: string;
  @Field()
    product_category!: string;
  @Field()
    title!: string;
  @Field()
    price!: number;
  @Field()
    quantity!: number;
  @Field()
    description!: string;
  @Field()
    date!: string;
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(UUIDFormat)
    id?: string;
  @Field({ nullable: true })
    owner_username?: string;
  @Field({ nullable: true })
    product_category?: string;
}
