import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create_customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService:CustomerService) {}

    @Get()
    getCustomer() {
        return this.customerService.getAllCustomer();
    }

    @Post()
    createCustomer(@Body() createCustomerDto:CreateCustomerDto){
        return this.customerService.addCustomer(createCustomerDto)
    }

}
