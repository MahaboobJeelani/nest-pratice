import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create_customer.dto';

@Injectable()
export class CustomerService {
    private customer: Customer[] = []

    getAllCustomer(): Customer[]{
        return this.customer;
    }

    addCustomer(createCustomerdto: CreateCustomerDto):Customer{
        const newCustomer: Customer = {
            id: Date.now(),
            ...createCustomerdto
        }

        this.customer.push(newCustomer);
        return newCustomer;
    }

    
}
