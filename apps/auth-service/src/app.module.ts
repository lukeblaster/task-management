import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './presentation/http/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './domain/repositories/user.repository';
import { TypeOrmUserRepository } from './infrastructure/database/typeorm/repositories/user.typeorm-repository';
import { UserTypeOrmEntity } from './infrastructure/database/typeorm/entities/user.typeorm-entity';
import { UserService } from './domain/services/user.service';
import { CreateUserUseCase } from './app/use-cases/users/create-user.use-case';
import { LoginUseCase } from './app/use-cases/auth/login.use-case';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: 'auth',
        entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserTypeOrmEntity]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
