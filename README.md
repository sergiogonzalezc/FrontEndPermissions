# Configuracion de proyecto (español)
Para ejecutar el front en modo **DEBUG**, se debe tener instalado:
- [Node 16 o superior]
- [Ejecutar npm install]
- [Verificar archivo .env ya que debe apuntar a la URL. En el código esta en apuntando al puerto 18000.]

Para iniciar la depuración, ejecutar:
**npm run dev**

**Importante:**
Tipo de proyecto: React JS con Javascript

Principales dependencias:
- [React 18.2] 
- [Vite 4.4.5]
- [Formik 2.4.5]
- [Mui 5.4.15]
- [Axios 1.6.0]
- [Moment 2.29.4]

# Proyecto compatible para crear imagen Docker. Pasos depuración local:
- [1] Inicar "Docker Desktop for Windows" v4.25.
- [2] Debe estar ubicado en el path donde está el archivo .Dockerfile, y ejecutar:

docker image build -t frontendchallenge:1.0 .

- [3] Obtener el **"GUID"** de "Docker for Desktop Windows".
- [4] Crear cotenedor a partir de la imagen anteriormente creada:

**docker container create --name frontendpermissions-container -p 8082:8081 GUID**
- [5] Iniciar el contenedor: 
**docker container start frontendpermissions-container**

- [6] El contenedor se debe iniciar en el puerto 8082, por ejemplo: Abrir al browser en http://localhost:8082/ debería ver el sitio web.

- [7] Importante: para ejecutar el sitio web desde el contenedor frontal, debe iniciar el contenedor back-end (establezca las instrucciones en el otro repositorio).
  
- [8] Fin.

# Project configuration (English)
To run the front in **DEBUG** mode, you must have installed:
- [Node 16 or higher]
- [Run npm install]
- [Check .env file as it should point to the URL. In the code it is pointing to port 18000.]

To start to debug, run:
**npm run dev**

**Important:**
Project type: React JS with Javascript

Main dependencies:
- [React 18.2]
- [Vite 4.4.5]
- [Formik 2.4.5]
- [Mui 5.4.15]
- [Axios 1.6.0]
- [Moment 2.29.4]

# Supported project to create Docker image. Local debugging steps:
- [1] Start "Docker Desktop for Windows" v4.25.
- [2] It must be located in the path where the .Dockerfile file is, and execute:

docker image build -t frontendchallenge:1.0 .

- [3] Get the "GUID" of "Docker for Desktop Windows".
- [4] Create a container from the previously created image:

docker container create --name frontendpermissions-container -p 8082:8081 GUID
- [5] Start the container:
docker container start frontendpermissions-container

- [6] The container should be started on port 8082, for example: Open the browser at http://localhost:8082/ you should see the website.

- [7] Important: To execute the website from front-container, you must start the back-end container (set instruction in the other repository).

- [8] End.
