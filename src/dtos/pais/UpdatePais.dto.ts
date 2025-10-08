import { IsString, Length, IsOptional } from 'class-validator';

export class UpdatePaisDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombre?: string;
}