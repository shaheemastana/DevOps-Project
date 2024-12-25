import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './Dto/User.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(userDto: UserDto) {
    return await this.userRepository.save(userDto);
  }

  async delete(id: number) {
    const result = await this.userRepository.delete({ id });

    if (!result.affected) {
      throw new BadRequestException({
        status: false,
        message: `User with ID ${id} not found`,
      });
    }
  }
}
