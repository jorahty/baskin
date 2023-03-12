import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';
import { Matches, Length, MinLength } from 'class-validator';
import { regexISODate, regexnanoID, regexSlug, regexUsername } from '../regex';

@ObjectType()
export class Product {
  @Field()
  @Matches(regexnanoID)
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
  @Field(() => [String])
  @MinLength(1)
    images!: string[];
  @Field(() => [AttributeValue], { nullable: true })
    attributes!: AttributeValue[];
}

@ObjectType()
class AttributeValue {
  @Field()
  @Matches(regexnanoID)
    id!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Length(1, 32)
    value!: string;
  @Field({ nullable: true })
  @Length(1, 32)
    symbol?: string;
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(regexnanoID)
    id?: string;
  @Field({ nullable: true })
    user?: string;
  @Field({ nullable: true })
    category?: string;
}

@ObjectType()
@InputType('ProductInput')
export class NewProduct {
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
    quantity!: number;
  @Field()
    discount!: number;
  @Field()
  @Length(1, 1024)
    description!: string;
  @Field(() => [String])
    images!: string[];
}

@ArgsType()
export class RemoveProductArgs {
  @Field()
  @Matches(regexnanoID)
    id!: string;
}
