*INICIAR PROYECTO:
    -Por consola primero ejecutar "mongod" para poder coenctarse a la base de datos.
    -"npm run dev" para ejecutarlo con nodemon.

*CARPETAS:
    "config": Sirve para configurar algunos modulos.
    "controllers": Nos ayuda a almacenar las funciones que se utilizan cuando un usuario visite alguna ruta del server.
    "helpers": Colocar funciones que hagan algo en la vista (hbs).
    "models": Almacena los schemas de mongoDB.
    "views": Se guardan los archivos hbs o html a enviar al navegador.

*MODULOS/DEPENDENCIAS:
    "bcryptjs": Sirve para encriptar , en este caso el password y usuario, y no quede guardado tal cual en la BD.
    "method-override": Es un midleware que permite hacer peticiones DELETE y PUT dentro de un formulario.
    "dotenv": Permite asignar variables a valores que queremos ocultar y así usarlos en el código sin que nadie los vea, incluso en los repositorios remotos. Va en el archivo que arranca la aplicacion.
    "connect-flash": Nos permite enviar mensajes al reidirigir a otra URL.
    "passport": Guarda la logica relacionada con la autenticación (login en este caso). Guarda la session en la memoria del servidor si este logra coincidir usuario y contraseña con las que hay en la BD.
    "passport-local": Nos va a ayudar interactuar con la BD.