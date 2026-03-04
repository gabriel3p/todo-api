import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existentUser: User | null = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (existentUser)
      throw new UnauthorizedException('User with this email already exists');

    const newUser: User = await this.prismaService.user.create({
      data: createUserDto
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({ include: { tasks: { include: { taskType: true } } } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
