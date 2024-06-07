import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/config/database.module';
import { UserController } from './user.controller';
import { UserProvider } from './entities/user.provider';
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register()
  ],
  controllers: [UserController],
  providers: [...UserProvider, UserService],
})
export class UserModule { }
