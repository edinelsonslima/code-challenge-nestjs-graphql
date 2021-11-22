import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormOptions } from './config/orm.config';
import { RepoModule } from './repo.module';
import { MessageResolver } from './resolvers/message.resolver';
import { UserResolver } from './resolvers/user.resolver';

const graphqlImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...graphqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
