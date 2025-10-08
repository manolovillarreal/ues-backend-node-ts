import { IsString, Length, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @Length(2, 150)
  nombre!: string;

  @IsString()
  @Length(2, 20)
  codigo!: string;

  @IsNumber()
  facultadId!: number;

  @IsNumber()
  profesorId!: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}