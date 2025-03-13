CREATE TABLE administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL ,
    dni VARCHAR(20) NOT NULL ,
    telefono VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    colegio VARCHAR(100) NOT NULL,
    deporte ENUM('Futbol', 'Basquet', 'Voley', 'Otro') NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    club VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    localidad VARCHAR(255) NOT NULL,
    barrio VARCHAR(255) NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE archivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id) ON DELETE CASCADE
);

CREATE TABLE solicitud_estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    estado ENUM('Pendiente', 'Aprobado', 'Rechazado') NOT NULL,
    comentario VARCHAR(255),
    fecha_cambio DATE NOT NULL,
    FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id) ON DELETE CASCADE
);
