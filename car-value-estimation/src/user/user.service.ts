import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repository.create({ email, password });
        return this.repository.save(user);
    }

    findOne(id: number) {
        if(!id){
            throw new UnauthorizedException('Unauthorize!');
        }
        return this.repository.findOne({ where: { id } });
    }

    find(email: string) {
        return this.repository.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            return new NotFoundException('User not found');
        }

        Object.assign(user, attrs);

        return this.repository.save(user);
    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            return new NotFoundException('User not found');
        }

        return this.repository.remove(user);
    }
}
