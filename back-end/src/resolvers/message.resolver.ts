import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { User } from 'src/db/models/user.entity';
import { RepoService } from 'src/repo.service';
import { DeleteMessageInput, MessageInput } from './input/message.input';

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return await this.repoService.messageRepo.find();
  }

  @Query(() => Message)
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return await this.repoService.messageRepo.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return await this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      content: input.content,
      userId: input.userId,
    });
    return await this.repoService.messageRepo.save(message);
  }

  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(input.id);
    if (!message || message.userId !== input.userId)
      throw new Error('Message does not exists or are not the message author');

    const copy = { ...message };
    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
    return await this.repoService.userRepo.findOne(parent.userId);
  }
}

export { MessageResolver };
