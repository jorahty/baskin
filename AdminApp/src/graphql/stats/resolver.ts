import { Resolver, Query, Authorized } from 'type-graphql';
import { StatService } from './service';
import { StatPayload } from './schema';

@Resolver()
export class StatsResolver {
  @Authorized()
  @Query(() => StatPayload)
  async stat(): Promise<StatPayload> {
    return new StatService().stat();
  }
}