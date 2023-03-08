import { Arg, Args, Resolver, Query, Mutation } from 'type-graphql';
import {
  Attribute,
  AttributeArgs,
  RemoveAttributeArgs,
  NewAttribute,
} from './schema';
import { AttributeService } from './service';


@Resolver()
export class AttributeResolver {
  @Query(() => [Attribute])
  async attribute(
    @Args() { id }: AttributeArgs
  ): Promise<Attribute[]> {
    return new AttributeService().list(id);
  }

  @Mutation(() => Attribute)
  async addAttribute(
    @Arg('input') input: NewAttribute,
  ): Promise<Attribute> {
    return new AttributeService().add(input);
  }

  @Mutation(() => Attribute)
  async removeAttribute(
    @Args() { id }: RemoveAttributeArgs
  ): Promise<Attribute> {
    return new AttributeService().remove(id);
  }
}