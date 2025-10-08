import { IsString, Length, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateProfesorDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  @Length(7, 15)
  telefono?: string;

  @IsOptional()
  @IsNumber()
  paisId?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}