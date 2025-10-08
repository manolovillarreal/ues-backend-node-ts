# 🗄️ Esquema de Base de Datos PostgreSQL - Sistema UES

Este archivo contiene el script SQL completo para crear la base de datos PostgreSQL del sistema universitario UES.

## 📋 Contenido del Script

### 🏗️ **Estructura de Base de Datos**
- **Base de datos**: `ues_db`
- **Encoding**: UTF-8
- **Esquema**: `public`
- **Tablas**: 8 tablas principales
- **Vistas**: 3 vistas de consulta
- **Triggers**: 8 triggers de actualización automática

### 📊 **Tablas Creadas**

| Tabla | Descripción | Campos Principales |
|-------|-------------|-------------------|
| `paises` | Países sudamericanos | id, nombre |
| `facultades` | Facultades universitarias | id, nombre, codigo |
| `profesores` | Información de profesores | id, nombre, correo, telefono, pais_id, activo |
| `estudiantes` | Información de estudiantes | id, nombre, email, facultad_id, pais_id, fecha_ingreso, activo |
| `cursos` | Cursos académicos | id, nombre, codigo, facultad_id, profesor_id, activo |
| `proyectos` | Proyectos de cursos | id, curso_id, nombre, descripcion, fechas, estado |
| `curso_estudiantes` | Relación M:M curso-estudiante | curso_id, estudiante_id, fecha_inscripcion, activo |
| `estudiante_proyectos` | Relación M:M estudiante-proyecto | proyecto_id, estudiante_id, calificacion, activo |

### 🔗 **Relaciones y Llaves Foráneas**

#### **Relaciones Principales:**
- `profesores.pais_id` → `paises.id` (ON DELETE SET NULL)
- `estudiantes.facultad_id` → `facultades.id` (ON DELETE RESTRICT)
- `estudiantes.pais_id` → `paises.id` (ON DELETE RESTRICT)
- `cursos.facultad_id` → `facultades.id` (ON DELETE RESTRICT)
- `cursos.profesor_id` → `profesores.id` (ON DELETE RESTRICT)
- `proyectos.curso_id` → `cursos.id` (ON DELETE CASCADE)

#### **Relaciones Many-to-Many:**
- `curso_estudiantes`: Cursos ↔ Estudiantes
- `estudiante_proyectos`: Estudiantes ↔ Proyectos

### 📈 **Índices Creados**
- Índices en campos de búsqueda frecuente (emails, códigos, IDs)
- Índices en campos de filtrado (activo, fechas, estados)
- Índices en llaves foráneas para optimizar JOIN

### 🎯 **Vistas Disponibles**
1. **`v_estudiantes_completa`** - Estudiantes con información de facultad y país
2. **`v_cursos_completa`** - Cursos con información de facultad y profesor
3. **`v_proyectos_completa`** - Proyectos con información de curso y facultad

### ⚡ **Triggers Automáticos**
- **`update_updated_at_column()`** - Actualiza automáticamente el campo `updated_at` en todas las tablas

## 🚀 Cómo Ejecutar el Script

### **Prerrequisitos:**
- PostgreSQL 12+ instalado
- Acceso con privilegios de administrador (postgres)
- Cliente PostgreSQL (psql, pgAdmin, DBeaver, etc.)

### **Método 1: Con psql (Terminal)**
```bash
# Conectar a PostgreSQL
psql -U postgres -h localhost

# Ejecutar el script
\i /ruta/al/archivo/database_schema.sql

# O directamente desde terminal
psql -U postgres -h localhost -f database_schema.sql
```

### **Método 2: Con pgAdmin**
1. Abrir pgAdmin
2. Conectar al servidor PostgreSQL
3. Click derecho en "Databases" → "Create" → "Database"
4. O ejecutar directamente el script completo
5. Abrir Query Tool
6. Copiar y pegar el contenido del archivo `database_schema.sql`
7. Ejecutar (F5)

### **Método 3: Con DBeaver**
1. Crear nueva conexión PostgreSQL
2. Abrir SQL Script
3. Copiar el contenido del archivo
4. Ejecutar script

## 🔧 Configuración Post-Instalación

### **1. Verificar la Creación:**
```sql
-- Verificar tablas creadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- Verificar datos de prueba
SELECT COUNT(*) as total_paises FROM paises;
SELECT COUNT(*) as total_facultades FROM facultades;
SELECT COUNT(*) as total_profesores FROM profesores;
```

### **2. Crear Usuario de Aplicación:**
```sql
-- Crear usuario para la aplicación
CREATE ROLE ues_app_user WITH LOGIN PASSWORD 'tu_password_seguro';

-- Otorgar permisos
GRANT CONNECT ON DATABASE ues_db TO ues_app_user;
GRANT USAGE ON SCHEMA public TO ues_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ues_app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ues_app_user;
```

### **3. Configurar String de Conexión:**
```javascript
// Para Node.js con pg
const connectionString = "postgresql://ues_app_user:password@localhost:5432/ues_db";

// Para Prisma
DATABASE_URL="postgresql://ues_app_user:password@localhost:5432/ues_db"

// Para TypeORM
{
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ues_app_user",
  password: "password",
  database: "ues_db"
}
```

## 📊 Datos de Prueba Incluidos

El script incluye datos de prueba (seed data):
- **10 países** sudamericanos
- **3 facultades** (FIA, FCH, FCE)
- **6 profesores** de ejemplo
- **10 cursos** distribuidos entre facultades

## 🔍 Consultas de Ejemplo

### **Estudiantes por Facultad:**
```sql
SELECT f.nombre AS facultad, COUNT(e.id) AS total_estudiantes
FROM facultades f
LEFT JOIN estudiantes e ON f.id = e.facultad_id
GROUP BY f.id, f.nombre;
```

### **Cursos con Profesor:**
```sql
SELECT * FROM v_cursos_completa WHERE activo = true;
```

### **Proyectos en Progreso:**
```sql
SELECT * FROM v_proyectos_completa 
WHERE estado = 'En Progreso'
ORDER BY fecha_inicio DESC;
```

### **Estudiantes por Proyecto:**
```sql
SELECT p.nombre AS proyecto, e.nombre AS estudiante, ep.calificacion
FROM estudiante_proyectos ep
JOIN proyectos p ON ep.proyecto_id = p.id
JOIN estudiantes e ON ep.estudiante_id = e.id
WHERE ep.activo = true
ORDER BY p.nombre, ep.calificacion DESC;
```

## 🛠️ Mantenimiento

### **Backup de la Base de Datos:**
```bash
pg_dump -U postgres -h localhost ues_db > backup_ues_$(date +%Y%m%d).sql
```

### **Restaurar Backup:**
```bash
psql -U postgres -h localhost -d ues_db < backup_ues_20241007.sql
```

### **Verificar Integridad:**
```sql
-- Verificar constraints
SELECT conname, contype FROM pg_constraint WHERE contype = 'f';

-- Verificar índices
SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public';
```

## 📋 Notas Importantes

- El script elimina y recrea la base de datos completa
- Se incluyen datos de prueba para testing inmediato
- Todos los campos de fecha incluyen timestamps automáticos
- Las relaciones están protegidas con constraints apropiados
- Los campos `updated_at` se actualizan automáticamente
- Los emails y códigos tienen restricciones de unicidad

## 🚨 Advertencias

- **¡CUIDADO!** El script elimina la base de datos existente
- Hacer backup antes de ejecutar en producción
- Verificar que los datos de prueba sean apropiados para tu entorno
- Cambiar las contraseñas por defecto en producción
- Revisar los permisos de usuario según tus necesidades de seguridad