
# Sistema de Verificación de Elegibilidad para Votar

## Descripción

Sistema de Verificación de Elegibilidad para Votar es un proyecto CRUD desarrollado completamente en TypeScript, con **Node.js** en el backend y **React.js** en el frontend. Este proyecto permite:

- Mostrar, agregar, eliminar y editar personas en una tabla.
- Filtrar personas según campos específicos.
- Determinar si un usuario puede votar, basándose en si es dominicano y mayor de edad.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- [npm](https://www.npmjs.com/) (v7 o superior recomendado)
- [Git](https://git-scm.com/)

## Instalación y uso

Sigue los pasos a continuación para clonar y ejecutar el proyecto.

### 1. Clonar el repositorio

Ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

```bash
git clone https://github.com/JoseAMota11/goetrack-project.git
```

### 2. Configurar el Frontend

1. Accede al directorio del frontend:

   ```bash
   cd frontend/
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Esto levantará el frontend en `http://localhost:3000`.

### 3. Configurar el Backend

1. Accede al directorio del backend:

   ```bash
   cd backend/
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Genera el build del backend:

   ```bash
   npm run build
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   Esto levantará el backend en `http://localhost:5173`.

## Estructura del proyecto

```plaintext
geotrack-project/
backend/
├── dist/             # Archivos generados tras la compilación
├── node_modules/     # Dependencias instaladas del proyecto
├── src/              # Código fuente del backend
│   ├── config/       # Configuración del proyecto (ej. base de datos)
│   ├── controllers/  # Controladores para manejar la lógica de las rutas
│   ├── models/       # Modelos de datos
│   ├── routes/       # Definición de las rutas de la API
│   ├── services/     # Lógica de negocio
│   ├── utils/        # Funciones de utilidad y helpers
│   └── index.ts      # Punto de entrada del backend
├── my_db.db          # Base de datos SQLite utilizada por el proyecto
├── package-lock.json # Archivo de bloqueo de dependencias
├── package.json      # Archivo de configuración de dependencias
└── tsconfig.json     # Configuración de TypeScript
frontend/
├── node_modules/         # Dependencias instaladas del proyecto
├── public/               # Archivos estáticos públicos
├── src/                  # Código fuente del frontend
│   ├── assets/           # Archivos estáticos como imágenes, íconos, etc.
│   ├── components/       # Componentes reutilizables de React
│   ├── context/          # Configuración de contextos globales
│   ├── hooks/            # Custom hooks de React
│   ├── services/         # Lógica de conexión con la API
│   ├── types/            # Definiciones de tipos de TypeScript
│   ├── utils/            # Funciones de utilidad
│   ├── App.tsx           # Componente principal de la aplicación
│   ├── config.json       # Configuraciones específicas de la app
│   ├── index.css         # Estilos globales de la aplicación
│   ├── main.tsx          # Archivo principal de entrada de React
│   ├── nationalities.json # Archivo JSON con datos de nacionalidades
│   └── vite-env.d.ts     # Definiciones de ambiente para Vite
├── eslint.config.js      # Configuración de ESLint
├── index.html            # Archivo HTML principal
├── package-lock.json     # Archivo de bloqueo de dependencias
├── package.json          # Archivo de configuración de dependencias
├── postcss.config.js     # Configuración de PostCSS
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.app.json     # Configuración específica de TypeScript para la app
├── tsconfig.json         # Configuración global de TypeScript
├── tsconfig.node.json    # Configuración de TypeScript para Node.js
└── vite.config.ts        # Configuración de Vite
```

## Características

- **CRUD completo**: Gestión de usuarios (crear, leer, actualizar y eliminar).
- **Filtros personalizados**: Filtrar datos en función de criterios específicos.
- **Validación personalizada**: Verifica si un usuario puede votar según su nacionalidad y edad.

---

**Autor:** José A. Mota  
[Repositorio del proyecto](https://github.com/JoseAMota11/goetrack-project)
