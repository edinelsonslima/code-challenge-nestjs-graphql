import { Field, InputType } from '@nestjs/graphql';
@InputType()
class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

@InputType()
class DeleteMessageInput {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}

export { MessageInput, DeleteMessageInput };
