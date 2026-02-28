import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { ProductModule } from './product/product.module';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule} from "@nestjs/mongoose"

@Module({
  imports: [StudentModule, CustomerModule, ProductModule, ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal: true
  }), 
  // connecting the database
  MongooseModule.forRoot(process.env.MONGODB_URI!)

],
  controllers: [AppController, MynameController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService, DatabaseService, EvService],
})
export class AppModule implements NestModule {
  // we use configure, when we are using the middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
