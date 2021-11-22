import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoService } from './repo.service';
import { User } from './db/models/user.model';
import { Message } from './db/models/message.model';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
