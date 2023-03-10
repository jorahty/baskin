import { Args, Resolver, Query, Mutation, Arg } from 'type-graphql';
import { NewProduct, Product, ProductArgs, RemoveProductArgs } from './schema';
import { ProductService } from './service';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async product(
    @Args() { id, user, category }: ProductArgs,
  ): Promise<Product[]> {
    return new ProductService().list(id, user, category);
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg('input') input: NewProduct,
  ): Promise<Product> {
    return new ProductService().add(input);
  }

  @Mutation(() => Product)
  async updateProduct(@Arg('id') id: string, @Arg('input') input: NewProduct): Promise<Product> {
    return new ProductService().list(id).then(async (product: Product[]): Promise<Product> => {
      return new ProductService().updateProduct(id, input, product[0].date);
    });
  }

  @Mutation(() => Product)
  async removeProduct(
    @Args() { id }: RemoveProductArgs,
  ): Promise<Product> {
    return new ProductService().remove(id);
  }
}
