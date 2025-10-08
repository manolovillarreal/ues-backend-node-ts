-- =========================================================
-- SISTEMA UNIVERSITARIO UES - BASE DE DATOS POSTGRESQL
-- =========================================================
-- Archivo: database_schema.sql
-- Descripción: Script para crear todas las tablas del sistema universitario UES
-- Autor: Sistema UES
-- Fecha: 2024-10-07
-- =========================================================

-- Configurar cliente para usar UTF-8
SET client_encoding = 'UTF8';

-- Eliminar base de datos si existe y crear nueva
DROP DATABASE IF EXISTS ues_db;
CREATE DATABASE ues_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Conectar a la base de datos UES
\c ues_db;

-- =========================================================
-- CREACIÓN DE ESQUEMAS
-- =========================================================

CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;

-- =========================================================
-- TABLA: paises
-- =========================================================

CREATE TABLE paises (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios para la tabla paises
COMMENT ON TABLE paises IS 'Tabla que almacena los países disponibles en el sistema';
COMMENT ON COLUMN paises.id IS 'Identificador único del país';
COMMENT ON COLUMN paises.nombre IS 'Nombre del país';
COMMENT ON COLUMN paises.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN paises.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: facultades
-- =========================================================

CREATE TABLE facultades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    codigo VARCHAR(10) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios para la tabla facultades
COMMENT ON TABLE facultades IS 'Tabla que almacena las facultades de la universidad';
COMMENT ON COLUMN facultades.id IS 'Identificador único de la facultad';
COMMENT ON COLUMN facultades.nombre IS 'Nombre completo de la facultad';
COMMENT ON COLUMN facultades.codigo IS 'Código único de la facultad (ej: FIA, FCH)';
COMMENT ON COLUMN facultades.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN facultades.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: profesores
-- =========================================================

CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    pais_id INTEGER REFERENCES paises(id) ON DELETE SET NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para profesores
CREATE INDEX idx_profesores_correo ON profesores(correo);
CREATE INDEX idx_profesores_pais_id ON profesores(pais_id);
CREATE INDEX idx_profesores_activo ON profesores(activo);

-- Comentarios para la tabla profesores
COMMENT ON TABLE profesores IS 'Tabla que almacena la información de los profesores';
COMMENT ON COLUMN profesores.id IS 'Identificador único del profesor';
COMMENT ON COLUMN profesores.nombre IS 'Nombre completo del profesor';
COMMENT ON COLUMN profesores.correo IS 'Correo electrónico único del profesor';
COMMENT ON COLUMN profesores.telefono IS 'Número de teléfono del profesor';
COMMENT ON COLUMN profesores.pais_id IS 'Referencia al país de origen del profesor';
COMMENT ON COLUMN profesores.activo IS 'Indica si el profesor está activo en el sistema';
COMMENT ON COLUMN profesores.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN profesores.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: estudiantes
-- =========================================================

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    facultad_id INTEGER NOT NULL REFERENCES facultades(id) ON DELETE RESTRICT,
    pais_id INTEGER NOT NULL REFERENCES paises(id) ON DELETE RESTRICT,
    fecha_ingreso DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para estudiantes
CREATE INDEX idx_estudiantes_email ON estudiantes(email);
CREATE INDEX idx_estudiantes_facultad_id ON estudiantes(facultad_id);
CREATE INDEX idx_estudiantes_pais_id ON estudiantes(pais_id);
CREATE INDEX idx_estudiantes_activo ON estudiantes(activo);
CREATE INDEX idx_estudiantes_fecha_ingreso ON estudiantes(fecha_ingreso);

-- Comentarios para la tabla estudiantes
COMMENT ON TABLE estudiantes IS 'Tabla que almacena la información de los estudiantes';
COMMENT ON COLUMN estudiantes.id IS 'Identificador único del estudiante';
COMMENT ON COLUMN estudiantes.nombre IS 'Nombre completo del estudiante';
COMMENT ON COLUMN estudiantes.email IS 'Correo electrónico único del estudiante';
COMMENT ON COLUMN estudiantes.facultad_id IS 'Referencia a la facultad del estudiante';
COMMENT ON COLUMN estudiantes.pais_id IS 'Referencia al país de origen del estudiante';
COMMENT ON COLUMN estudiantes.fecha_ingreso IS 'Fecha de ingreso del estudiante a la universidad';
COMMENT ON COLUMN estudiantes.activo IS 'Indica si el estudiante está activo en el sistema';
COMMENT ON COLUMN estudiantes.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN estudiantes.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: cursos
-- =========================================================

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    facultad_id INTEGER NOT NULL REFERENCES facultades(id) ON DELETE RESTRICT,
    profesor_id INTEGER NOT NULL REFERENCES profesores(id) ON DELETE RESTRICT,
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para cursos
CREATE INDEX idx_cursos_codigo ON cursos(codigo);
CREATE INDEX idx_cursos_facultad_id ON cursos(facultad_id);
CREATE INDEX idx_cursos_profesor_id ON cursos(profesor_id);
CREATE INDEX idx_cursos_activo ON cursos(activo);

-- Comentarios para la tabla cursos
COMMENT ON TABLE cursos IS 'Tabla que almacena la información de los cursos';
COMMENT ON COLUMN cursos.id IS 'Identificador único del curso';
COMMENT ON COLUMN cursos.nombre IS 'Nombre del curso';
COMMENT ON COLUMN cursos.codigo IS 'Código único del curso (ej: MAT101, INF201)';
COMMENT ON COLUMN cursos.facultad_id IS 'Referencia a la facultad que ofrece el curso';
COMMENT ON COLUMN cursos.profesor_id IS 'Referencia al profesor que imparte el curso';
COMMENT ON COLUMN cursos.activo IS 'Indica si el curso está activo';
COMMENT ON COLUMN cursos.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN cursos.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: proyectos
-- =========================================================

CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    nombre VARCHAR(200),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_finalizacion DATE,
    estado VARCHAR(50),
    fecha_asignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para proyectos
CREATE INDEX idx_proyectos_curso_id ON proyectos(curso_id);
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_fecha_inicio ON proyectos(fecha_inicio);
CREATE INDEX idx_proyectos_fecha_finalizacion ON proyectos(fecha_finalizacion);

-- Comentarios para la tabla proyectos
COMMENT ON TABLE proyectos IS 'Tabla que almacena los proyectos asignados a cursos';
COMMENT ON COLUMN proyectos.id IS 'Identificador único del proyecto';
COMMENT ON COLUMN proyectos.curso_id IS 'Referencia al curso al que pertenece el proyecto';
COMMENT ON COLUMN proyectos.nombre IS 'Nombre del proyecto';
COMMENT ON COLUMN proyectos.descripcion IS 'Descripción detallada del proyecto';
COMMENT ON COLUMN proyectos.fecha_inicio IS 'Fecha de inicio del proyecto';
COMMENT ON COLUMN proyectos.fecha_finalizacion IS 'Fecha de finalización del proyecto';
COMMENT ON COLUMN proyectos.estado IS 'Estado actual del proyecto (En Progreso, Completado, etc.)';
COMMENT ON COLUMN proyectos.fecha_asignacion IS 'Fecha y hora de asignación del proyecto al curso';
COMMENT ON COLUMN proyectos.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN proyectos.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: curso_estudiantes (Relación Many-to-Many)
-- =========================================================

CREATE TABLE curso_estudiantes (
    curso_id INTEGER NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
    fecha_inscripcion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (curso_id, estudiante_id)
);

-- Índices para curso_estudiantes
CREATE INDEX idx_curso_estudiantes_curso_id ON curso_estudiantes(curso_id);
CREATE INDEX idx_curso_estudiantes_estudiante_id ON curso_estudiantes(estudiante_id);
CREATE INDEX idx_curso_estudiantes_activo ON curso_estudiantes(activo);
CREATE INDEX idx_curso_estudiantes_fecha_inscripcion ON curso_estudiantes(fecha_inscripcion);

-- Comentarios para la tabla curso_estudiantes
COMMENT ON TABLE curso_estudiantes IS 'Tabla de relación many-to-many entre cursos y estudiantes';
COMMENT ON COLUMN curso_estudiantes.curso_id IS 'Referencia al curso';
COMMENT ON COLUMN curso_estudiantes.estudiante_id IS 'Referencia al estudiante';
COMMENT ON COLUMN curso_estudiantes.fecha_inscripcion IS 'Fecha y hora de inscripción del estudiante al curso';
COMMENT ON COLUMN curso_estudiantes.activo IS 'Indica si la inscripción está activa';
COMMENT ON COLUMN curso_estudiantes.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN curso_estudiantes.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TABLA: estudiante_proyectos (Relación Many-to-Many)
-- =========================================================

CREATE TABLE estudiante_proyectos (
    proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
    calificacion DECIMAL(4,2) CHECK (calificacion >= 0 AND calificacion <= 100),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (proyecto_id, estudiante_id)
);

-- Índices para estudiante_proyectos
CREATE INDEX idx_estudiante_proyectos_proyecto_id ON estudiante_proyectos(proyecto_id);
CREATE INDEX idx_estudiante_proyectos_estudiante_id ON estudiante_proyectos(estudiante_id);
CREATE INDEX idx_estudiante_proyectos_activo ON estudiante_proyectos(activo);
CREATE INDEX idx_estudiante_proyectos_calificacion ON estudiante_proyectos(calificacion);

-- Comentarios para la tabla estudiante_proyectos
COMMENT ON TABLE estudiante_proyectos IS 'Tabla de relación many-to-many entre estudiantes y proyectos';
COMMENT ON COLUMN estudiante_proyectos.proyecto_id IS 'Referencia al proyecto';
COMMENT ON COLUMN estudiante_proyectos.estudiante_id IS 'Referencia al estudiante';
COMMENT ON COLUMN estudiante_proyectos.calificacion IS 'Calificación del estudiante en el proyecto (0-100)';
COMMENT ON COLUMN estudiante_proyectos.activo IS 'Indica si la asignación está activa';
COMMENT ON COLUMN estudiante_proyectos.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN estudiante_proyectos.updated_at IS 'Fecha y hora de última actualización del registro';

-- =========================================================
-- TRIGGERS PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- =========================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para cada tabla
CREATE TRIGGER update_paises_updated_at BEFORE UPDATE ON paises FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_facultades_updated_at BEFORE UPDATE ON facultades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profesores_updated_at BEFORE UPDATE ON profesores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON estudiantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cursos_updated_at BEFORE UPDATE ON cursos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proyectos_updated_at BEFORE UPDATE ON proyectos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_curso_estudiantes_updated_at BEFORE UPDATE ON curso_estudiantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estudiante_proyectos_updated_at BEFORE UPDATE ON estudiante_proyectos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================
-- DATOS DE PRUEBA (SEED DATA)
-- =========================================================

-- Insertar países de Sudamérica
INSERT INTO paises (nombre) VALUES
('Argentina'),
('Brasil'),
('Chile'),
('Colombia'),
('Ecuador'),
('Perú'),
('Bolivia'),
('Paraguay'),
('Uruguay'),
('Venezuela');

-- Insertar facultades
INSERT INTO facultades (nombre, codigo) VALUES
('Facultad de Ingeniería y Arquitectura', 'FIA'),
('Facultad de Ciencias y Humanidades', 'FCH'),
('Facultad de Ciencias Económicas', 'FCE');

-- Insertar profesores
INSERT INTO profesores (nombre, correo, telefono, pais_id, activo) VALUES
('Dr. Carlos Alberto Mendoza', 'carlos.mendoza@ues.edu.sv', '+503 2225-1234', 1, true),
('Lic. María Elena Rodríguez', 'maria.rodriguez@ues.edu.sv', '+503 2225-5678', 1, true),
('Ing. José Antonio García', 'jose.garcia@ues.edu.sv', '+503 2225-9012', 1, true),
('Dra. Ana Sofía López', 'ana.lopez@ues.edu.sv', '+503 2225-3456', 2, true),
('Lic. Roberto Martínez', 'roberto.martinez@ues.edu.sv', '+503 2225-7890', 1, true),
('Ing. Patricia Hernández', 'patricia.hernandez@ues.edu.sv', '+503 2225-2468', 3, false);

-- Insertar cursos
INSERT INTO cursos (nombre, codigo, facultad_id, profesor_id, activo) VALUES
('Álgebra Lineal', 'MAT101', 1, 1, true),
('Programación I', 'INF101', 1, 3, true),
('Cálculo Diferencial', 'MAT102', 1, 1, true),
('Estructura de Datos', 'INF201', 1, 3, true),
('Base de Datos', 'INF301', 1, 3, true),
('Literatura Contemporánea', 'LIT201', 2, 2, true),
('Historia de El Salvador', 'HIS101', 2, 4, true),
('Microeconomía', 'ECO101', 3, 5, true),
('Contabilidad General', 'CON101', 3, 5, true),
('Ingeniería de Software', 'INF401', 1, 6, false);

-- =========================================================
-- VISTAS ÚTILES
-- =========================================================

-- Vista de estudiantes con información de facultad y país
CREATE VIEW v_estudiantes_completa AS
SELECT 
    e.id,
    e.nombre,
    e.email,
    f.nombre AS facultad_nombre,
    f.codigo AS facultad_codigo,
    p.nombre AS pais_nombre,
    e.fecha_ingreso,
    e.activo,
    e.created_at,
    e.updated_at
FROM estudiantes e
JOIN facultades f ON e.facultad_id = f.id
JOIN paises p ON e.pais_id = p.id;

-- Vista de cursos con información de facultad y profesor
CREATE VIEW v_cursos_completa AS
SELECT 
    c.id,
    c.nombre,
    c.codigo,
    f.nombre AS facultad_nombre,
    f.codigo AS facultad_codigo,
    pr.nombre AS profesor_nombre,
    pr.correo AS profesor_correo,
    c.activo,
    c.created_at,
    c.updated_at
FROM cursos c
JOIN facultades f ON c.facultad_id = f.id
JOIN profesores pr ON c.profesor_id = pr.id;

-- Vista de proyectos con información de curso
CREATE VIEW v_proyectos_completa AS
SELECT 
    p.id,
    p.nombre,
    p.descripcion,
    c.nombre AS curso_nombre,
    c.codigo AS curso_codigo,
    f.nombre AS facultad_nombre,
    p.fecha_inicio,
    p.fecha_finalizacion,
    p.estado,
    p.fecha_asignacion,
    p.created_at,
    p.updated_at
FROM proyectos p
JOIN cursos c ON p.curso_id = c.id
JOIN facultades f ON c.facultad_id = f.id;

-- =========================================================
-- PERMISOS Y ROLES (OPCIONAL)
-- =========================================================

-- Crear rol para la aplicación
-- CREATE ROLE ues_app_user WITH LOGIN PASSWORD 'ues_secure_password';

-- Otorgar permisos
-- GRANT CONNECT ON DATABASE ues_db TO ues_app_user;
-- GRANT USAGE ON SCHEMA public TO ues_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ues_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ues_app_user;

-- =========================================================
-- INFORMACIÓN DEL ESQUEMA
-- =========================================================

SELECT 'Base de datos UES creada exitosamente' AS mensaje,
       'Tablas: 8' AS entidades,
       'Vistas: 3' AS vistas_creadas,
       'Triggers: 8' AS triggers_actualizacion,
       NOW() AS fecha_creacion;

-- Mostrar estadísticas de las tablas
SELECT 
    schemaname,
    tablename,
    attname AS column_name,
    typname AS data_type
FROM pg_stats ps
JOIN pg_type pt ON ps.statyp1 = pt.oid
WHERE schemaname = 'public'
ORDER BY tablename, attname;

-- =========================================================
-- FIN DEL SCRIPT
-- =========================================================