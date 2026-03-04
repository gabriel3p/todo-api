import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existentUser = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (existentUser)
      throw new UnauthorizedException('User with this email already exists');

    const newUser = await this.prismaService.user.create({
      data: createUserDto
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({ include: { tasks: { include: { taskType: true } } } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: { include: { taskType: true } } }
    });

    if (!user)
      throw new NotFoundException('User not found');

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.findOne(id);

    await this.prismaService.user.update({
      where: { id },
      data: updateUserDto
    });

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prismaService.user.delete({
      where: { id }
    });
  }
}
