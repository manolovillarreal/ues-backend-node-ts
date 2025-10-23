import { IsString, Length, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class AsignacionProfesorDto {
  @IsNumber()
  cursoId!: number; 
  @IsNumber()
  profesorId!: number;
}