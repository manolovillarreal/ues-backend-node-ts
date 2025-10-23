# 🎓 Sistema Universitario UES (Universidad de Élite Suramericana)
Ejercicio Academico Corporación Universitaria de Asturias
Especialización en Desarrollo Web
Patrones de Desarrollo de Software 
Caso Practico Unidad 1 - Introducción a los Patrones de Diseño

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
│   │   ├── 📄 ICCIS.service.ts  # Servicio sistema externo
│   │   ├── 📄 asignacionCurso.service.ts # 🔔 Observer Pattern
│   │   └── 📄 *.service.ts
│   ├── 📁 repositories/         # Acceso a datos
│   │   ├── 📁 in-memory/       # Implementación en memoria
│   │   └── 📄 I*.repository.ts  # Interfaces
│   ├── 📁 adapters/             # 🔌 Patrón Adapter
│   │   ├── 📄 IHttpAdapter.ts   # Interfaz adaptador HTTP
│   │   └── 📁 impl/
│   │       └── 📄 ICCISAdapterMock.ts # Mock para desarrollo
│   ├── 📁 proxys/               # 🛡️ Patrón Proxy
│   │   └── 📄 ProyectoRepositoryProxy.ts # Proxy enriquecimiento
│   ├── 📁 observers/            # 🔔 Patrón Observer
│   │   └── 📄 notificarProfesorAsignado.ts # Observer notificaciones
│   ├── 📁 builders/             # 🏗️ Builder Pattern
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
│   │   ├── 📄 Observable.ts    # 🔔 Clase base Observer Pattern
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

### **🏗️ Patrones Creacionales**

#### **Builder Pattern**
Construcción fluida de objetos complejos:
```typescript
const estudiante = EstudianteBuilder
  .fromCreateDto(dto)
  .setId(1)
  .setFechaIngreso(new Date())
  .build();
```

### **🔔 Patrones de Comportamiento**

#### **🔔 Observer Pattern**
Sistema de notificaciones para eventos del sistema universitario:

**Clase Observable Base:**
```typescript
export class Observable<T> {
  private observers: Array<(data: T) => void> = [];

  suscribir(observer: (data: T) => void): void {
    this.observers.push(observer);
  }

  desuscribir(observer: (data: T) => void): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notificar(data: T): void {
    for (const observer of this.observers) {
      observer(data);
    }
  }
}
```

**Subject (Observado) - Servicio de Asignación:**
```typescript
export class AsignacionCursoService extends Observable<NotificacionProfesorDto> {
  async asignarCurso(payload: AsignacionProfesorDto): Promise<void> {
    // Validaciones y lógica de negocio...
    
    const profesorRetirado = (profesorActual && profesorActual.id !== profesor.id) 
      ? profesorActual 
      : undefined;

    // Notificar a todos los observadores
    this.notificar({
      curso: existingCurso,
      profesor: profesor,
      profesorRetirado,
    });
  }
}
```

**Observer - Función de Notificación:**
```typescript
export function notificarProfesorAsignado(event: NotificacionProfesorDto) {
  const { curso, profesor, profesorRetirado } = event;
  
  console.log(
    `Notificación: el profesor ${profesor.nombre} fue asignado al curso ${curso.nombre}.`
  );

  if (profesorRetirado) {
    console.log(
      `Notificación adicional: el profesor ${profesorRetirado.nombre} fue retirado del curso ${curso.nombre}.`
    );
  }
}
```

**Uso del Pattern:**
```typescript
// Configuración del Observer
const asignacionService = new AsignacionCursoService();
asignacionService.suscribir(notificarProfesorAsignado);

// Al ejecutar la asignación, se disparan automáticamente las notificaciones
await asignacionService.asignarCurso({ cursoId: 1, profesorId: 2 });
```

**Beneficios del Observer Pattern:**
- ✅ **Desacoplamiento**: Los observers no conocen la implementación del subject
- ✅ **Extensibilidad**: Fácil agregar nuevos tipos de notificaciones
- ✅ **Flexibilidad**: Múltiples observers pueden suscribirse al mismo evento
- ✅ **Mantenibilidad**: Cambios en notificaciones no afectan la lógica de negocio

### **🏛️ Patrones Estructurales**

#### **🔌 Adapter Pattern**
Integración con sistemas externos (ICCIS) mediante adaptadores HTTP:

**Interfaz del Adaptador:**
```typescript
export interface IHttpAdapter {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<void>;
}
```

**Implementación Mock para Desarrollo:**
```typescript
export class ICCISAdapterMock implements IHttpAdapter {
  async get<T>(url: string): Promise<T> {
    // Simula llamadas HTTP al sistema ICCIS
    const match = url.match(/\/proyectos\/(\d+)/);
    if (match) {
      const proyecto = proyectosICCISMock.find(p => 
        p.id === parseInt(match[1] || '0')
      );
      return proyecto as T;
    }
    throw { response: { status: 404 } };
  }
}
```

**Uso en el Servicio:**
```typescript
export class ICCISService {
  constructor(httpAdapter?: IHttpAdapter) {
    this.httpAdapter = httpAdapter ?? new ICCISAdapterMock();
  }

  async getProyectoById(proyectoId: number): Promise<any> {
    return await this.httpAdapter.get(
      `${API_BASE_URL}/proyectos/${proyectoId}`
    );
  }
}
```

#### **🛡️ Proxy Pattern**
Control de acceso y enriquecimiento de datos para proyectos:

```typescript
export class ProyectoRepositoryProxy implements IProyectoRepository {
  constructor(
    private readonly innerRepository: IProyectoRepository,
    private readonly iccisService: ICCISService
  ) {}

  // Intercepta consultas y enriquece datos
  async findById(id: number): Promise<Proyecto | null> {
    const proyecto = await this.innerRepository.findById(id);
    if (!proyecto) return null;
    
    return await this.enriquecerProyecto(proyecto);
  }

  private async enriquecerProyecto(proyecto: Proyecto): Promise<Proyecto> {
    try {
      const dataICCIS = await this.iccisService.getProyectoById(proyecto.id);
      return { ...proyecto, ...dataICCIS };
    } catch {
      console.warn(`No se pudo obtener información del proyecto ICCIS`);
      return proyecto;
    }
  }
}
```

### **🏗️ Patrones Arquitecturales**

#### **🗄️ Repository Pattern**
Abstracción del acceso a datos:
```typescript
interface IEstudianteRepository {
  create(estudiante: CreateEstudianteDto): Promise<Estudiante>;
  findAll(): Promise<Estudiante[]>;
  findById(id: number): Promise<Estudiante | null>;
}
```

#### **💼 Service Layer Pattern**
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

#### **🔄 DTO Pattern**
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

### **🏛️ Integración con Sistemas Externos**
- **Patrón Adapter**: Abstrae la comunicación HTTP con el sistema ICCIS
- **Intercambiabilidad**: Fácil cambio entre implementaciones mock y reales
- **Tolerancia a fallos**: Manejo graceful de errores de conectividad

### **🛡️ Enriquecimiento de Datos**
- **Patrón Proxy**: Transparente enriquecimiento de proyectos con datos ICCIS
- **Caching inteligente**: Evita llamadas redundantes al sistema externo
- **Degradación elegante**: Funciona aún si el sistema externo no está disponible

### **� Sistema de Notificaciones**
- **Patrón Observer**: Notificaciones automáticas de eventos del sistema
- **Desacoplamiento**: Los observers no conocen al subject y viceversa
- **Extensibilidad**: Fácil adición de nuevos tipos de notificaciones
- **Eventos del sistema**: Asignación/reasignación de profesores a cursos

### **�🔧 Arquitectura Escalable**
- **Separación de responsabilidades**
- **Inyección de dependencias**
- **Interfaces bien definidas**
- **Código mantenible y testeable**


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



## 👥 Autor

**Manuel Enrique Villarreal Arango** - Ingeniero Informatico y de Sistemas

---

### 🎯 **¿Necesitas ayuda?**

- 📚 **Documentación completa**: `docs/`
- 🧪 **Testing**: `docs/postman/README.md`
- 🗄️ **Base de datos**: `docs/DATABASE_README.md`

---

<div align="center">


![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.18+-lightgrey?logo=express&style=for-the-badge)

</div>
