# 📋 Colecciones de Postman - Sistema UES

Este directorio contiene las colecciones de Postman para probar todos los endpoints del sistema universitario UES.

## 📁 Archivos disponibles

### 🔗 Colecciones individuales por entidad:
1. **`UES-Auth.postman_collection.json`** - Autenticación (login, register, profile)
2. **`UES-Paises.postman_collection.json`** - Gestión de países
3. **`UES-Facultades.postman_collection.json`** - Gestión de facultades  
4. **`UES-Profesores.postman_collection.json`** - Gestión de profesores
5. **`UES-Estudiantes.postman_collection.json`** - Gestión de estudiantes y proyectos
6. **`UES-Cursos.postman_collection.json`** - Gestión de cursos e inscripciones
7. **`UES-Proyectos.postman_collection.json`** - Gestión de proyectos y asignaciones

### 🎯 Colección completa:
8. **`UES-API-Completa.postman_collection.json`** - Todas las entidades en una sola colección

## 🚀 Cómo importar en Postman

### Método 1: Importación individual
1. Abre Postman
2. Haz clic en **"Import"** en la esquina superior izquierda
3. Selecciona **"Upload Files"**
4. Elige el archivo `.json` de la entidad que deseas probar
5. Haz clic en **"Import"**

### Método 2: Importación múltiple
1. Selecciona todos los archivos `.json` a la vez
2. Arrástralos directamente a la ventana de Postman
3. Postman importará todas las colecciones automáticamente

## ⚙️ Configuración

### Variables de entorno:
Cada colección incluye variables predefinidas:
- **`baseUrl`**: `http://localhost:3000` (URL base del servidor)
- **`authToken`**: Se configura automáticamente al hacer login

### Cambiar el servidor:
Para usar un servidor diferente, modifica la variable `baseUrl`:
1. Ve a la colección importada
2. Haz clic en **"Variables"**
3. Cambia el valor de `baseUrl` (ej: `https://api.ues.edu.sv`)

## 🔐 Autenticación

La colección de **Auth** incluye scripts automáticos:
- Al hacer **login exitoso**, el token se guarda automáticamente en `authToken`
- Los endpoints protegidos usan automáticamente este token

### Flujo recomendado:
1. Ejecuta **POST Login** con credenciales válidas
2. El token se guarda automáticamente
3. Ejecuta cualquier otro endpoint (usará el token automáticamente)

## 📊 Endpoints principales por entidad

### 🌍 Países
- `GET /api/paises` - Obtener todos
- `POST /api/paises` - Crear nuevo
- `GET /api/paises/{id}` - Obtener por ID
- `PUT /api/paises/{id}` - Actualizar
- `DELETE /api/paises/{id}` - Eliminar

### 🏛️ Facultades  
- `GET /api/facultades` - Obtener todas
- `POST /api/facultades` - Crear nueva
- `GET /api/facultades/{id}` - Obtener por ID
- `PUT /api/facultades/{id}` - Actualizar
- `DELETE /api/facultades/{id}` - Eliminar

### 👨‍🏫 Profesores
- `GET /api/profesores` - Obtener todos
- `POST /api/profesores` - Crear nuevo
- `GET /api/profesores/{id}` - Obtener por ID
- `GET /api/profesores/pais/{paisId}` - Obtener por país
- `PUT /api/profesores/{id}` - Actualizar
- `PATCH /api/profesores/{id}/deactivate` - Desactivar
- `DELETE /api/profesores/{id}` - Eliminar

### 👨‍🎓 Estudiantes
- `GET /api/estudiantes` - Obtener todos
- `POST /api/estudiantes` - Crear nuevo
- `GET /api/estudiantes/{id}` - Obtener por ID
- `GET /api/estudiantes/facultad/{facultadId}` - Obtener por facultad
- `GET /api/estudiantes/{id}/proyectos` - Proyectos del estudiante
- `GET /api/estudiantes/{id}/proyectos/activos` - Proyectos activos
- `PUT /api/estudiantes/{id}` - Actualizar
- `PATCH /api/estudiantes/{id}/deactivate` - Desactivar
- `DELETE /api/estudiantes/{id}` - Eliminar

### 📚 Cursos
- `GET /api/cursos` - Obtener todos
- `POST /api/cursos` - Crear nuevo
- `GET /api/cursos/{id}` - Obtener por ID
- `GET /api/cursos/facultad/{facultadId}` - Obtener por facultad
- `GET /api/cursos/profesor/{profesorId}` - Obtener por profesor
- `POST /api/cursos/{id}/estudiantes` - Inscribir estudiante
- `GET /api/cursos/{id}/estudiantes` - Estudiantes del curso
- `DELETE /api/cursos/{id}/estudiantes/{estudianteId}` - Desinscribir
- `PUT /api/cursos/{id}` - Actualizar
- `PATCH /api/cursos/{id}/deactivate` - Desactivar
- `DELETE /api/cursos/{id}` - Eliminar

### 🚀 Proyectos
- `GET /api/proyectos` - Obtener todos
- `POST /api/proyectos/asignar` - Asignar proyecto a curso
- `GET /api/proyectos/{id}` - Obtener por ID
- `GET /api/proyectos/curso/{cursoId}` - Obtener por curso
- `GET /api/proyectos/curso/{cursoId}/activos` - Activos por curso
- `POST /api/proyectos/{id}/estudiantes` - Asignar estudiante
- `GET /api/proyectos/{id}/estudiantes` - Estudiantes del proyecto
- `GET /api/proyectos/{id}/estudiantes/activos` - Estudiantes activos
- `PUT /api/proyectos/{id}/estudiantes/{estudianteId}` - Actualizar asignación
- `PATCH /api/proyectos/{id}/estudiantes/{estudianteId}/activar` - Activar
- `PATCH /api/proyectos/{id}/estudiantes/{estudianteId}/desactivar` - Desactivar
- `DELETE /api/proyectos/{id}/estudiantes/{estudianteId}` - Desasignar
- `PATCH /api/proyectos/{id}/desasignar` - Desasignar de curso
- `DELETE /api/proyectos/{id}` - Eliminar

## 💡 Ejemplos de datos

### Crear estudiante:
```json
{
  "nombre": "María González",
  "email": "maria.gonzalez@estudiante.ues.edu.sv",
  "facultadId": 1,
  "paisId": 1,
  "fechaIngreso": "2024-02-15T00:00:00.000Z",
  "activo": true
}
```

### Asignar proyecto:
```json
{
  "cursoId": 1,
  "nombre": "Sistema de Gestión de Biblioteca",
  "descripcion": "Desarrollo de un sistema web para gestión de libros y préstamos",
  "fechaInicio": "2024-03-01T00:00:00.000Z",
  "fechaFinalizacion": "2024-07-15T00:00:00.000Z",
  "estado": "En Progreso"
}
```

### Asignar estudiante a proyecto:
```json
{
  "estudianteId": 1,
  "calificacion": 8.5,
  "activo": true
}
```

## 🔧 Troubleshooting

### Error 404 "Cannot GET /api/..."
- Verifica que el servidor esté ejecutándose en `http://localhost:3000`
- Confirma que la variable `baseUrl` esté configurada correctamente

### Error 401 "Unauthorized"
- Ejecuta el endpoint **POST Login** primero
- Verifica que el token se haya guardado en la variable `authToken`

### Error 400 "Validation failed"
- Verifica que el JSON del body tenga la estructura correcta
- Asegúrate de que todos los campos requeridos estén presentes

### Error de conexión
- Confirma que el servidor esté ejecutándose: `npm run dev`
- Verifica que no haya firewall bloqueando el puerto 3000

## 📝 Notas adicionales

- Todas las fechas deben estar en formato ISO 8601: `"2024-02-15T00:00:00.000Z"`
- Los IDs son numéricos y secuenciales
- El sistema usa datos mock pre-cargados para testing
- Las respuestas siguen el formato estándar `RespuestaAPI<T>`