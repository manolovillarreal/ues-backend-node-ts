import { IsString, Length } from 'class-validator';

export class CreatePaisDto {
  @IsString()
  @Length(2, 100)
  nombre!: string;
}