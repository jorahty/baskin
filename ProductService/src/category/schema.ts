import { ArgsType, Field, ObjectType } from 'type-graphql';
import { Matches, Length } from 'class-validator';
import { regexSlug } from '../regex';

@ObjectType()
export class Category {
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field()
  @Length(1, 32)
    name!: string;
}

@ArgsType()
export class CategoryArgs {
  @Field({ nullable: true })
  @Matches(regexSlug)
    slug?: string;
}
