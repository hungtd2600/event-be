import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  imageUrl: string

  @IsString()
  location: string
}
