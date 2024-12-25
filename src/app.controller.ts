import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './Dto/User.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getList() {
    return await this.appService.getAll();
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.appService.create(userDto);
  }

  @Delete()
  async delete(@Res() response: Response, @Body() { id }: { id: number }) {
    await this.appService.delete(id);

    return response.status(200).json({ status: true });
  }
}
