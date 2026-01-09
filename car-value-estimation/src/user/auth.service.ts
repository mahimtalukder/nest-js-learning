import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException("Email already exist!");
        }
        // Hash the user passowrd
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt 
        const resultPassword = salt + '!' + hash.toString("hex");
    
        //Store the user
        const user = await this.userService.create(email, resultPassword);

        //return the user
        return user;
    }

    async signin(email: string, password: string) {
        //Find the user
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException("User not found!");
        }

        //Split salt and password. and use a '!' for a saparator in signup
        const [salt, hash] = user.password.split('!');

        const reHash =(await scrypt(password, salt, 32)) as Buffer;

        if(hash !== reHash.toString("hex")){
            throw new BadRequestException(
              'Email or password does not matched!',
            );
        }

        return user;

    }
}
