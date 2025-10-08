# Base de Datos Mock - InMemory

Esta carpeta contiene archivos JSON que sirven como base de datos estática para los repositorios InMemory del sistema universitario.

## Estructura de Datos

### 📁 Archivos JSON

| Archivo | Entidad | Cantidad | Descripción |
|---------|---------|----------|-------------|
| `paises.json` | País | 10 | Países de Sudamérica |
| `facultades.json` | Facultad | 3 | Facultades de la UES |
| `profesores.json` | Profesor | 6 | Profesores activos e inactivos |
| `cursos.json` | Curso | 10 | Cursos de diferentes facultades |
| `estudiantes.json` | Estudiante | 20 | Estudiantes de diversas facultades |
| `proyectos.json` | Proyecto | 5 | Proyectos asignados a cursos |
| `cursoEstudiantes.json` | CursoEstudiante | 24 | Relaciones estudiante-curso |
| `estudianteProyectos.json` | EstudianteProyecto | 13 | Asignaciones estudiante-proyecto |

### 🌍 Países (10)
- Argentina, Brasil, Chile, Colombia, Ecuador, Perú, Bolivia, Paraguay, Uruguay, Venezuela

### 🏛️ Facultades (3)
1. **FIA** - Facultad de Ingeniería y Arquitectura
2. **FCH** - Facultad de Ciencias y Humanidades  
3. **FCE** - Facultad de Ciencias Económicas

### 👨‍🏫 Profesores (6)
- 5 activos, 1 inactivo
- Distribuidos entre las 3 facultades
- Incluye información de contacto y país de origen

### 📚 Cursos (10)
- **Ingeniería (5)**: Álgebra Lineal, Programación I, Cálculo, Estructura de Datos, Base de Datos
- **Humanidades (2)**: Literatura Contemporánea, Historia de El Salvador
- **Económicas (2)**: Microeconomía, Contabilidad General
- **Inactivo (1)**: Ingeniería de Software

### 👨‍🎓 Estudiantes (20)
- 19 activos, 1 inactivo
- Distribuidos proporcionalmente entre facultades
- Fechas de ingreso desde 2020 hasta 2023
- Diversidad de países sudamericanos

### 🚀 Proyectos (5)
1. **Sistema de Gestión Académica** (Programación I)
2. **Árbol Binario de Búsqueda** (Estructura de Datos)
3. **Base de Datos E-commerce** (Base de Datos)
4. **Análisis de Mercado Digital** (Microeconomía)
5. **Documentación Histórica Digital** (Historia de El Salvador)

### 🔗 Relaciones

#### Curso-Estudiante (24 inscripciones)
- Estudiantes inscritos en múltiples cursos
- Fechas de inscripción realistas
- Todas las relaciones activas

#### Estudiante-Proyecto (13 asignaciones)
- Calificaciones entre 7.5 y 9.5
- 12 asignaciones activas, 1 inactiva
- Estudiantes trabajando en proyectos de sus cursos

## 📊 Estadísticas

### Distribución por Facultad:
- **Ingeniería**: 8 estudiantes, 5 cursos, 3 proyectos
- **Humanidades**: 6 estudiantes, 2 cursos, 1 proyecto  
- **Económicas**: 6 estudiantes, 2 cursos, 1 proyecto

### Participación en Proyectos:
- **Proyecto 1**: 3 estudiantes (Sistema de Gestión)
- **Proyecto 2**: 2 estudiantes (Árbol Binario)
- **Proyecto 3**: 2 estudiantes (E-commerce DB)
- **Proyecto 4**: 3 estudiantes (Análisis de Mercado)
- **Proyecto 5**: 3 estudiantes (Documentación Histórica)

## 🔧 Uso

```typescript
import { mockData } from './db/inMemory/index.js';

// Acceder a los datos
const estudiantes = mockData.estudiantes;
const proyectos = mockData.proyectos;
const relaciones = mockData.estudianteProyectos;
```

## 📝 Notas

- Las fechas están en formato ISO 8601
- Los IDs son secuenciales y únicos por entidad
- Las relaciones respetan la integridad referencial
- Los datos incluyen casos edge: estudiantes inactivos, profesor inactivo, curso inactivo
- Las calificaciones son realistas (7.5-9.5)
- Los correos siguen el patrón de la UES