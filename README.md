# 🎓 Sistema Universitario UES (Universidad de El Salvador)

Sistema de gestión universitaria desarrollado con **Node.js**, **TypeScript** y **Express**, implementando patrones de diseño avanzados y arquitectura limpia.

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [📦 Tecnologías](#-tecnologías)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🎯 Uso](#-uso)
- [📊 API Endpoints](#-api-endpoints)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🧪 Testing con Postman](#-testing-con-postman)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Patrones Implementados](#-patrones-implementados)
- [🌟 Características Avanzadas](#-características-avanzadas)
- [🤝 Contribución](#-contribución)

## 🚀 Características

### ✨ **Funcionalidades Principales**
- **Gestión completa de entidades universitarias** (Estudiantes, Profesores, Cursos, Facultades, Proyectos)
- **Sistema de autenticación y autorización** con JWT
- **Relaciones complejas Many-to-Many** (Estudiantes-Cursos, Estudiantes-Proyectos)
- **Validaciones robustas** con class-validator
- **API RESTful** con documentación OpenAPI
- **Base de datos mock** con datos realistas pre-cargados

### 🏛️ **Entidades del Sistema**
- 🌍 **Países** - Gestión de países sudamericanos
- 🏛️ **Facultades** - Facultades universitarias (FIA, FCE, FCH)
- 👨‍🏫 **Profesores** - Información académica y personal
- 👨‍🎓 **Estudiantes** - Datos estudiantiles y relaciones
- 📚 **Cursos** - Cursos académicos con inscripciones
- 🚀 **Proyectos** - Proyectos de curso con asignaciones

## 🏗️ Arquitectura

El sistema implementa **Clean Architecture** con separación clara de responsabilidades:

```
📁 UES/
├── 🎮 Controllers/     # Manejo de peticiones HTTP
├── ⚙️ Services/        # Lógica de negocio
├── 🗄️ Repositories/    # Acceso a datos
├── 🏗️ Builders/        # Builder Pattern
├── 📝 DTOs/            # Data Transfer Objects
├── 🔧 Models/          # Interfaces de entidades
├── 🛡️ Middleware/      # Validaciones y autenticación
└── 🛣️ Routes/          # Definición de endpoints
```

### 🔄 **Flujo de Datos**
```
Cliente → Routes → Middleware → Controllers → Services → Repositories → Data
```

## 📦 Tecnologías

### **Backend Core**
- ![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js) **Node.js 18+**
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript) **TypeScript 5.0+**
- ![Express](https://img.shields.io/badge/Express-4.18+-lightgrey?logo=express) **Express.js**

### **Validación y Desarrollo**
- ![class-validator](https://img.shields.io/badge/class--validator-latest-orange) **class-validator** - Validaciones decorador-based
- ![ts-node-dev](https://img.shields.io/badge/ts--node--dev-latest-yellow) **ts-node-dev** - Hot reload para desarrollo

### **Base de Datos**
- 🗄️ **In-Memory Repository** (Desarrollo)
- 🐘 **PostgreSQL** (Producción - Schema incluido)

## ⚡ Instalación y Configuración

### **Prerequisitos**
- Node.js 18+ instalado
- npm o yarn
- PostgreSQL (opcional, para producción)

### **1. Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/ues-sistema.git
cd ues-sistema
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Ejecutar en desarrollo**
```bash
# Desarrollo con hot reload
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### **4. Compilar para producción**
```bash
# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

## 🎯 Uso

### **🔗 URL Base**
```
http://localhost:3000/api
```

### **📱 Ejemplo de uso rápido**

#### **1. Obtener todas las facultades**
```bash
curl http://localhost:3000/api/facultades
```

#### **2. Crear un nuevo estudiante**
```bash
curl -X POST http://localhost:3000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González",
    "email": "maria@estudiante.ues.edu.sv",
    "facultadId": 1,
    "paisId": 1,
    "fechaIngreso": "2024-02-15",
    "activo": true
  }'
```

#### **3. Inscribir estudiante en curso**
```bash
curl -X POST http://localhost:3000/api/cursos/1/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "estudianteId": 1,
    "fechaInscripcion": "2024-02-15",
    "activo": true
  }'
```

## 📊 API Endpoints

### **🌍 Países** `/api/paises`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los países |
| GET | `/:id` | Obtener país por ID |
| POST | `/` | Crear nuevo país |
| PUT | `/:id` | Actualizar país |
| DELETE | `/:id` | Eliminar país |

### **🏛️ Facultades** `/api/facultades`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todas las facultades |
| GET | `/:id` | Obtener facultad por ID |
| POST | `/` | Crear nueva facultad |
| PUT | `/:id` | Actualizar facultad |
| DELETE | `/:id` | Eliminar facultad |

### **👨‍🏫 Profesores** `/api/profesores`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los profesores |
| GET | `/:id` | Obtener profesor por ID |
| GET | `/pais/:paisId` | Obtener profesores por país |
| POST | `/` | Crear nuevo profesor |
| PUT | `/:id` | Actualizar profesor |
| PATCH | `/:id/deactivate` | Desactivar profesor |
| DELETE | `/:id` | Eliminar profesor |

### **👨‍🎓 Estudiantes** `/api/estudiantes`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los estudiantes |
| GET | `/:id` | Obtener estudiante por ID |
| GET | `/facultad/:facultadId` | Obtener estudiantes por facultad |
| GET | `/:id/proyectos` | Obtener proyectos del estudiante |
| GET | `/:id/proyectos/activos` | Obtener proyectos activos |
| POST | `/` | Crear nuevo estudiante |
| PUT | `/:id` | Actualizar estudiante |
| PATCH | `/:id/deactivate` | Desactivar estudiante |
| DELETE | `/:id` | Eliminar estudiante |

### **📚 Cursos** `/api/cursos`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los cursos |
| GET | `/:id` | Obtener curso por ID |
| GET | `/facultad/:facultadId` | Obtener cursos por facultad |
| GET | `/profesor/:profesorId` | Obtener cursos por profesor |
| POST | `/` | Crear nuevo curso |
| POST | `/:id/estudiantes` | Inscribir estudiante en curso |
| GET | `/:id/estudiantes` | Obtener estudiantes del curso |
| DELETE | `/:id/estudiantes/:estudianteId` | Desinscribir estudiante |
| PUT | `/:id` | Actualizar curso |
| PATCH | `/:id/deactivate` | Desactivar curso |
| DELETE | `/:id` | Eliminar curso |

### **🚀 Proyectos** `/api/proyectos`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los proyectos |
| GET | `/:id` | Obtener proyecto por ID |
| GET | `/curso/:cursoId` | Obtener proyectos por curso |
| GET | `/curso/:cursoId/activos` | Obtener proyectos activos por curso |
| POST | `/asignar` | Asignar proyecto a curso |
| POST | `/:id/estudiantes` | Asignar estudiante a proyecto |
| GET | `/:id/estudiantes` | Obtener estudiantes del proyecto |
| GET | `/:id/estudiantes/activos` | Obtener estudiantes activos |
| PUT | `/:id/estudiantes/:estudianteId` | Actualizar asignación |
| PATCH | `/:id/estudiantes/:estudianteId/activar` | Activar estudiante |
| PATCH | `/:id/estudiantes/:estudianteId/desactivar` | Desactivar estudiante |
| DELETE | `/:id/estudiantes/:estudianteId` | Desasignar estudiante |
| PATCH | `/:id/desasignar` | Desasignar proyecto de curso |
| DELETE | `/:id` | Eliminar proyecto |

## 🗄️ Base de Datos

### **🔄 Desarrollo (In-Memory)**
El sistema incluye repositorios en memoria con datos mock pre-cargados:
- 10 países sudamericanos
- 3 facultades (FIA, FCE, FCH)
- 6 profesores activos
- 20 estudiantes distribuidos
- 10 cursos académicos
- 5 proyectos asignados

### **🐘 Producción (PostgreSQL)**
Schema completo disponible en `docs/database_schema.sql`:
```sql
-- Ejemplo de estructura
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    facultad_id INTEGER REFERENCES facultades(id),
    pais_id INTEGER REFERENCES paises(id),
    fecha_ingreso DATE NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **⚡ Configuración rápida PostgreSQL**
```bash
# Conectar a PostgreSQL
psql -U postgres -h localhost

# Ejecutar schema
\i docs/database_schema.sql
```

## 🧪 Testing con Postman

### **📁 Colecciones disponibles**
- `UES-API-Completa.postman_collection.json` - Colección completa
- `UES-Auth.postman_collection.json` - Autenticación
- `UES-Estudiantes.postman_collection.json` - Gestión de estudiantes
- `UES-Cursos.postman_collection.json` - Gestión de cursos
- Y más... (ver `docs/postman/`)

### **🚀 Importar en Postman**
1. Abrir Postman
2. Click **"Import"**
3. Seleccionar archivos en `docs/postman/`
4. ¡Listo para probar!

### **⚙️ Variables incluidas**
- `baseUrl`: `http://localhost:3000`
- `authToken`: Se configura automáticamente

Documentación completa: [`docs/postman/README.md`](docs/postman/README.md)

## 📁 Estructura del Proyecto

```
📁 UES/
├── 📁 src/
│   ├── 📁 controllers/          # Controladores REST
│   │   ├── 📄 auth.controller.ts
│   │   ├── 📄 estudiante.controller.ts
│   │   ├── 📄 profesor.controller.ts
│   │   └── 📄 ...
│   ├── 📁 services/             # Lógica de negocio
│   │   ├── 📁 interfaces/       # Interfaces de servicios
│   │   ├── 📁 impl/            # Implementaciones
│   │   └── 📄 *.service.ts
│   ├── 📁 repositories/         # Acceso a datos
│   │   ├── 📁 in-memory/       # Implementación en memoria
│   │   └── 📄 I*.repository.ts  # Interfaces
│   ├── 📁 builders/             # Builder Pattern
│   │   ├── 📄 EstudianteBuilder.ts
│   │   ├── 📄 ProfesorBuilder.ts
│   │   └── 📄 ...
│   ├── 📁 dtos/                # Data Transfer Objects
│   │   ├── 📁 estudiante/      # DTOs por entidad
│   │   ├── 📁 profesor/
│   │   └── 📄 ...
│   ├── 📁 models/              # Interfaces de entidades
│   │   ├── 📄 Estudiante.ts
│   │   ├── 📄 Profesor.ts
│   │   └── 📄 ...
│   ├── 📁 middleware/          # Middleware personalizado
│   │   ├── 📄 validateDto.ts
│   │   ├── 📄 errorHandler.ts
│   │   └── 📄 ...
│   ├── 📁 routes/              # Definición de rutas
│   │   ├── 📄 estudiante.routes.ts
│   │   ├── 📄 profesor.routes.ts
│   │   └── 📄 index.ts
│   └── 📁 db/                  # Datos mock
│       └── 📁 inMemory/
├── 📁 docs/                    # Documentación
│   ├── 📁 postman/            # Colecciones Postman
│   ├── 📄 database_schema.sql  # Schema PostgreSQL
│   └── 📄 DATABASE_README.md
├── 📁 dist/                    # Código compilado
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md
```

## 🔧 Patrones Implementados

### **🏗️ Builder Pattern**
Construcción fluida de objetos complejos:
```typescript
const estudiante = EstudianteBuilder
  .fromCreateDto(dto)
  .setId(1)
  .setFechaIngreso(new Date())
  .build();
```

### **🗄️ Repository Pattern**
Abstracción del acceso a datos:
```typescript
interface IEstudianteRepository {
  create(estudiante: CreateEstudianteDto): Promise<Estudiante>;
  findAll(): Promise<Estudiante[]>;
  findById(id: number): Promise<Estudiante | null>;
}
```

### **💼 Service Layer Pattern**
Lógica de negocio centralizada:
```typescript
class EstudianteService {
  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    await this.validarFacultad(dto.facultadId);
    await this.validarEmailUnico(dto.email);
    return this.repository.create(dto);
  }
}
```

### **🔄 DTO Pattern**
Transferencia de datos tipada:
```typescript
class CreateEstudianteDto {
  @IsString() @Length(2, 150)
  nombre!: string;
  
  @IsEmail()
  email!: string;
  
  @IsNumber()
  facultadId!: number;
}
```

## 🌟 Características Avanzadas

### **🛡️ Validaciones Robustas**
- **class-validator** para validación automática
- **Validaciones de integridad referencial**
- **Validaciones de negocio personalizadas**

### **🔄 Relaciones Complejas**
- **Many-to-Many**: Estudiantes ↔ Cursos
- **Many-to-Many**: Estudiantes ↔ Proyectos  
- **One-to-Many**: Facultad → Estudiantes
- **One-to-Many**: Profesor → Cursos

### **📊 Datos Realistas**
- **Países sudamericanos** completos
- **Facultades UES** reales (FIA, FCE, FCH)
- **Nombres y emails** realistas
- **Relaciones coherentes** entre entidades

### **🔧 Arquitectura Escalable**
- **Separación de responsabilidades**
- **Inyección de dependencias**
- **Interfaces bien definidas**
- **Código mantenible y testeable**

## 🤝 Contribución

### **🚀 Cómo contribuir**
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **📋 Estándares de código**
- **TypeScript strict mode** habilitado
- **ESLint** para consistencia de código
- **Conventional Commits** para mensajes
- **Documentación** en español

### **🧪 Testing**
- Usar colecciones Postman incluidas
- Verificar todos los endpoints
- Validar casos edge
- Documentar nuevos endpoints

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Autor

**Sistema UES** - Desarrollado para la Universidad de El Salvador

---

### 🎯 **¿Necesitas ayuda?**

- 📚 **Documentación completa**: `docs/`
- 🧪 **Testing**: `docs/postman/README.md`
- 🗄️ **Base de datos**: `docs/DATABASE_README.md`
- 🐛 **Issues**: Reportar problemas en el repositorio

---

<div align="center">

**Desarrollado con ❤️ para la Universidad de El Salvador**

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.18+-lightgrey?logo=express&style=for-the-badge)

</div>