import { Module } from '@nestjs/common';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { OrgsController } from './orgs/orgs.controller';
import { OrgsService } from './orgs/orgs.service';

const configFactory = {
  provide: 'GIT_TOKEN',
  useFactory: () => {
    return process.env.GIT_TOKEN || 'thisisyoursecret';
  },
};

@Module({
  imports: [],
  controllers: [OrgsController, CommentsController],
  providers: [
    OrgsService,
    configFactory,
  ],
})
export class AppModule {}
