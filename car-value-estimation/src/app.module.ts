import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    UserModule, 
    ReportsModule, 
    // Database connection setup
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      // this will auto create tables based on entities, good for development
      synchronize: true,
    })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
