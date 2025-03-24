import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserPhone } from './entities/user_phones.entity';
import { UpdateUserPhoneDto } from './dto/update-phone.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPhone)
    private readonly phoneRepository: Repository<UserPhone>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new BadRequestException('El correo ya registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      created_at: new Date(),
      modified_at: new Date(),
      last_login: new Date(),
      token: uuid.v4(),
    });

    await this.userRepository.save(user);
    if (createUserDto.phones && createUserDto.phones.length > 0) {
      const phones = createUserDto.phones.map((phone) => {
        const phoneEntity = this.phoneRepository.create(phone);
        phoneEntity.user = user;
        return phoneEntity;
      });

      await this.phoneRepository.save(phones);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['phones'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['phones'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.update(id, { is_active: false });
  }

  async updateUserPhone(
    userId: string,
    phoneId: string,
    updateUserPhoneDto: UpdateUserPhoneDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['phones'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const phone = user.phones.find((phone) => phone.id === phoneId);

    if (!phone) {
      throw new Error('Phone not found');
    }

    Object.assign(phone, updateUserPhoneDto);
    await this.phoneRepository.save(phone);
    return phone;
  }
}
