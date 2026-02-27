import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { ProductModule } from './product/product.module';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';

@Module({
  imports: [StudentModule, CustomerModule, ProductModule],
  controllers: [AppController, MynameController, UserRolesController, ExceptionController],
  providers: [AppService],
})
export class AppModule {}
