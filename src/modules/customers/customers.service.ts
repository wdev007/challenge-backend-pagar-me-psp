import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async create(customer: CreateCustomerDto) {
    const found = await this.customersRepository.findOne({
      where: {
        email: customer.email,
      },
    });

    if (found) {
      throw new HttpException(
        'Customer already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const customerCreated = this.create(customer);

    await this.customersRepository.save(customerCreated);

    return customerCreated;
  }

  async findAll() {
    return this.customersRepository.find();
  }

  async findOne(id: number) {
    const found = await this.customersRepository.findOne(id);

    if (!found) {
      throw new HttpException('Customer does not exist', HttpStatus.NOT_FOUND);
    }

    return this.customersRepository.findOne(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const found = await this.customersRepository.findOne(id);

    if (!found) {
      throw new HttpException('Customer does not exist', HttpStatus.NOT_FOUND);
    }

    const customerToSave = await this.create(
      Object.assign(found, updateCustomerDto),
    );

    await this.customersRepository.save(customerToSave);

    return customerToSave;
  }

  async remove(id: number) {
    const found = await this.customersRepository.findOne(id);

    if (!found) {
      throw new HttpException('Customer does not exist', HttpStatus.NOT_FOUND);
    }

    await this.customersRepository.softDelete(id);
  }
}
