import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateFacultadDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  nombre?: string;

  @IsOptional()
  @IsString()
  codigo?: string;
}