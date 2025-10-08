import { IsString, Length, IsEmail, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateEstudianteDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  facultadId?: number;

  @IsOptional()
  @IsNumber()
  paisId?: number;

  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}