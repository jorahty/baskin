import { Args, Resolver, Query } from 'type-graphql';
import {
  Attribute,
  AttributeArgs
} from './schema'
import { AttributeService } from './service';


@Resolver()
export class AttributeResolver {
  @Query(() => [Attribute])
  async attribute(
    @Args() { id }: AttributeArgs
  ): Promise<Attribute[]> {
    return new AttributeService().list(id);
  }
}