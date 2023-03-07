import { ArgsType, Field, ObjectType, InputType } from 'type-graphql';
import { Matches, Length, MinLength } from 'class-validator';
import { regexSlug, regexUUID } from '../regex';

@ObjectType()
export class Category {
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field({ nullable: true })
  @Matches(regexSlug)
    parent?: string;
}

@ObjectType()
export class Attribute {
  @Field()
  @Matches(regexUUID)
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

@ArgsType()
export class RemoveCategoryArgs {
  @Field()
  @Matches(regexSlug)
    slug!: string;
}

@ArgsType()
export class EditCategoryArgs {
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field({ nullable: true })
  @Length(1, 32)
    name?: string;
  @Field({ nullable: true })
  @Matches(regexSlug)
    parent?: string;
}

@ObjectType()
@InputType('CategoryInput')
export class NewCategory {
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field({ nullable: true })
  @Matches(regexSlug)
    parent?: string;
}
