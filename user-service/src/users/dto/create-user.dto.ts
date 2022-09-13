import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'THis is a user name' })
  @IsNotEmpty()
  public username: string;

  /**
   * A email should be strong
   */
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
