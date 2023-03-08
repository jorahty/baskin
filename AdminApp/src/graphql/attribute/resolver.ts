import { Args, Resolver, Query, Authorized, Mutation } from 'type-graphql';
import {
  Attribute,
  AttributeArgs,
  RemoveAttributeArgs,
} from './schema';
import { AttributeService } from './service';


@Resolver()
export class AttributeResolver {
  @Authorized()
  @Query(() => [Attribute])
  async attribute(
    @Args() { id }: AttributeArgs
  ): Promise<Attribute[]> {
    return new AttributeService().list(id);
  }

  @Authorized()
  @Mutation(() => Attribute)
  async removeAttribute(
    @Args() { id }: RemoveAttributeArgs
  ): Promise<Attribute> {
    return new AttributeService().remove(id);
  }
}