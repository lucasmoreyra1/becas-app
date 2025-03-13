# BecaApp

BecaApp es una aplicación para la gestión de solicitudes de becas. Los usuarios pueden cargar su solicitud, ver el estado de su solicitud, y los administradores pueden revisar, aprobar o rechazar estas solicitudes dejandoles un comentario. El solicitante recibirá una notificación por correo electrónico con el nuevo estado de su solicitud.

## Tecnologías

- **Frontend**: React.js y Tailwind css
- **Backend**: Node.js con Express
- **Base de Datos**: Sequelize (con base de datos MySQL)
- **Almacenamiento de Archivos**: FTP

## Requisitos

- Node.js y npm instalados en tu máquina.
- Un servidor de base de datos SQL (MySQL).
- Acceso FTP para cargar los archivos de las solicitudes.

## Inicializacion

- Variables de Entorno: Configurar el archivo `.env` en server2 para almacenar variables de configuración en Node.js.
- Instalar los paquetes necesarios con npm
- En node(server2) ejecutar los scipts:
  - "/sync.js" para generar las tablas
  - "/config/initAdmin.js" se debe ejecutar para crear un primer usuario administrador en la base de datos con los siguientes datos:
    Correo electrónico: admin@email.com
    Contraseña: admin123
