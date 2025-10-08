import { IsString, Length, IsEmail, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @Length(2, 150)
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  facultadId!: number;

  @IsNumber()
  paisId!: number;

  @IsDateString()
  fechaIngreso!: string; // Se recibe como string desde la API y se convierte a Date

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}