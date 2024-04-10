import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async getAll() {
    const data = await this.userRepository.find();
    console.log(data, 'data');
    return data;
  }

  async create(user) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = await this.userRepository.save(user);
    console.log(newUser, 'newUser');
    return newUser;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = { sub: user.id, username: user.username };
        console.log(payload, 'payload');
        const test = await this.jwtService.sign(payload);
        console.log(test, 'test');

        return {
          //   access_token: await this.jwtService.signAsync(payload),
        };
      }
      return 'Invalid Credentials!';
    }
    return 'Invalid Invalid!';
  }
}
