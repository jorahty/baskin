import { ArgsType, Field, ObjectType } from "type-graphql";
import { Matches, Length } from "class-validator";
import { regexISODate, regexSlug, regexUsername, regexUUID } from "../regex";

@ObjectType()
export class Product {
  @Field()
  @Matches(regexUUID)
    id!: string;
  @Field()
  @Matches(regexUsername)
    user!: string;
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
    price!: number;
  @Field()
    discount!: number;
  @Field()
    quantity!: number;
  @Field()
  @Length(1, 1024)
    description!: string;
  @Field()
  @Matches(regexISODate)
    date!: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars  
  @Field(type => [String])
    pictures!: string[];
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(regexUUID)
    id?: string;
  @Field({ nullable: true })
    user?: string;
  @Field({ nullable: true })
    category?: string;
}

@ArgsType()
export class FavoriteProductArgs {
  @Field()
  @Matches(regexUUID)
    product!: string;
}

@ObjectType()
export class FavoriteProduct {
  @Field()
  @Matches(regexUUID)
    product!: string;
  @Field()
  @Matches(regexUsername)
    user!: string;
}

@ArgsType()
export class NewProductArgs {
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
    price!: number;
  @Field()
    quantity!: number;
  @Field()
  @Length(1, 1024)
    description!: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars  
  @Field(type => [String])
    pictures!: string[];
}