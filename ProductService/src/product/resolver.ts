import { Args, Resolver, Query, Mutation, Arg } from 'type-graphql';
import { NewProduct, Product, ProductArgs, ProductStat, RemoveProductArgs } from './schema';
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
    const productService = new ProductService();
    const product = await productService.add(input);
    const newAttributes = [];
    if (input.attributes) {
      for (const attribute of (input.attributes)) {
        newAttributes.push(await productService.setAttributeValue(attribute, product.id));
      }
    }

    return product;
  }

  @Mutation(() => Product)
  async updateProduct(@Arg('id') id: string, @Arg('input') input: NewProduct): Promise<Product> {
    return new ProductService().list(id).then(async (product: Product[]): Promise<Product> => {
      // if (product.length === 0) {
      //   throw new GraphQLError('ID doesn\'t exist');
      // }
      return new ProductService().updateProduct(id, input, product[0].date);
    });
  }

  @Mutation(() => Product)
  async removeProduct(
    @Args() { id }: RemoveProductArgs,
  ): Promise<Product> {
    return new ProductService().remove(id);
  }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   @Query(returns => ProductStat)
  async productStat(): Promise<ProductStat> {
    return new ProductService().stat();
  }
}
