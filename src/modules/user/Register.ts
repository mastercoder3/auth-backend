import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()

export class RegisterResolver{
    
    @Query(() => String)
    async hello(){
        return "hello world";
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {email, firstName, lastName, password} : RegisterInput
    ): Promise<User> {
        
        const hashPassword = bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword.toString()
        }).save()

        return user;
    }
}