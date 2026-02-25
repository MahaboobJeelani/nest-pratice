import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';

@Module({
  imports: [StudentModule, CustomerModule],
  controllers: [AppController, MynameController],
  providers: [AppService],
})
export class AppModule {}
