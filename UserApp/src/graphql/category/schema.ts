import { ArgsType, Field, ObjectType } from 'type-graphql';
import { Matches, Length, MinLength } from 'class-validator';
import { regexnanoID, regexSlug, regexUUID } from '../regex';

@ObjectType()
export class Category {
  @Field()
    slug!: string;
  @Field()
    name!: string;
}

@ObjectType()
export class Attribute {
  @Field()
  @Matches(regexnanoID)
    id!: string;
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Length(1, 32)
    type!: string;
  @Field({ nullable: true })
    min?: number;
  @Field({ nullable: true })
    max?: number;
  @Field({ nullable: true })
    step?: number;
  @Field({ nullable: true })
  @Length(1, 8)
    symbol?: string;
  @Field(() => [String], { nullable: true })
  @MinLength(1)
    values?: string[];
}

@ArgsType()
export class CategoryArgs {
  @Field({ nullable: true })
  @Matches(regexSlug)
    slug?: string;
}

@ArgsType()
export class CategoryChildrenArgs {
  @Field({ nullable: true })
  @Matches(regexSlug)
    slug?: string;
}

@ArgsType()
export class CategoryAncestorsArgs {
  @Field()
  @Matches(regexSlug)
    slug!: string;
}

@ArgsType()
export class CategoryAttributesArgs {
  @Field()
  @Matches(regexSlug)
    slug!: string;
}
