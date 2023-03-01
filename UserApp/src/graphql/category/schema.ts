import { ArgsType, Field, ObjectType } from 'type-graphql';
import { Matches } from 'class-validator';
import { regexSlug } from '../regex';

@ObjectType()
export class Category {
  @Field()
    slug!: string;
  @Field()
    name!: string;
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
