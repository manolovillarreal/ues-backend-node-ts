import { IsString, IsOptional, IsDateString, Length, IsNumber, IsPositive } from 'class-validator';

// DTO que representa los datos que vienen del dominio externo (vista para el cliente)
export class ProyectoDto {
  @IsNumber()
  @IsPositive()
  id!: number;
  
  @IsString()
  @Length(2, 200)
  nombre!: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFinalizacion?: string;

  @IsNumber()
  @IsPositive()
  cursoId!: number;

   @IsOptional()
  @IsDateString()
  fechaAsignacion?: string;

}