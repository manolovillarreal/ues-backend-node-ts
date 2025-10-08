import { IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class UpdateEstudianteProyectoDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  calificacion?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}