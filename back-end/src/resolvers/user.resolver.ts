import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/db/models/user.model';
import { RepoService } from 'src/repo.service';
import { UserInput } from './input/user.input';

@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return await this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createOrLoginUser(
    @Args('data') input: UserInput,
  ): Promise<User> {
    let user = await this.repoService.userRepo.findOne({
      where: {
        email: input.email.toLocaleLowerCase().trim(),
      },
    });

    if (!user) {
      user = this.repoService.userRepo.create({
        email: input.email.toLocaleLowerCase().trim(),
      });

      await this.repoService.userRepo.save(user);
    }

    return user;
  }
}

export { UserResolver };
