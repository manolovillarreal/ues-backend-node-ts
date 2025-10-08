import { IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateEstudianteProyectoDto {
  @IsNumber()
  proyectoId!: number;

  @IsNumber()
  estudianteId!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  calificacion!: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}