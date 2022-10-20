import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one symbol`
    })
    password: string;
}
