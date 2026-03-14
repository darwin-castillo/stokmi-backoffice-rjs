# Stokmi Admin

Un panel de administración moderno, responsivo y robusto construido con React, Vite y Tailwind CSS. Esta aplicación sirve como un panel central para administrar diversas entidades como Usuarios, Productos y Tiendas, demostrando las mejores prácticas en la arquitectura de React y el diseño de UI/UX.

## 🚀 Características

- **Sistema de Autenticación**: Flujo de inicio de sesión seguro con rutas protegidas utilizando React Context (`AuthContext`).
- **Interfaz del Panel**: Diseño limpio e intuitivo que presenta una barra de navegación lateral responsiva.
- **Gestión de Usuarios**:
  - Visualiza todos los usuarios registrados en una lista.
  - Añade nuevos usuarios con un formulario completo que incluye validación de entradas.
  - Validación avanzada de contraseñas (longitud mínima, mayúsculas, números) y confirmación.
- **Gestión de Productos**:
  - Visualiza productos con un cambio dinámico entre diseños de Cuadrícula (Grid) y Tabla para una mejor accesibilidad.
  - Crea nuevos productos utilizando un formulario modal dedicado.
- **Gestión de Estado**: Aprovechamiento de hooks personalizados (`useUsers`, `useProducts`, `useStores`, `useGlobal`) para una lógica de componentes limpia y abstracción de la API.
- **Arquitectura Modular**: Clara separación de responsabilidades utilizando `services` para las llamadas a la API y `models` para la estructuración de datos.

## 🛠️ Tecnologías

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) para un desarrollo rápido y construcciones optimizadas.
- **Enrutamiento**: [React Router DOM](https://reactrouter.com/) para una navegación fluida en la Aplicación de Página Única (SPA).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para un desarrollo rápido de la interfaz de usuario con estilos basados en utilidades.
- **Iconos**: [Lucide React](https://lucide.dev/) para una iconografía limpia y consistente.

## 📁 Estructura de Carpetas

```
src/
├── components/   # Componentes de UI reutilizables (Sidebar, Layout, Navbar, etc.)
├── context/      # Proveedores de React Context (ej. AuthContext)
├── hooks/        # Hooks personalizados para carga de datos y estado (useUsers, etc.)
├── models/       # Formas de datos y estados iniciales (UserModel, ProductModel, etc.)
├── pages/        # Vistas para diferentes rutas (Login, Dashboard, Users, Products, etc.)
├── services/     # Lógica de integración de API y clientes HTTP
├── App.jsx       # Componente principal de la aplicación y definición de rutas
└── main.jsx      # Punto de entrada
```

## ⚙️ Primeros Pasos

### Requisitos Previos

- [Node.js](https://nodejs.org/) (se recomienda v16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <URL-del-repositorio>
   cd my-admin-panel
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
   *(o `yarn install`)*

3. **Configuración del Entorno**:
   Asegúrate de haber configurado tus variables de entorno si tus servicios requieren una `BASE_URL` específica.

4. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abrir la aplicación**:
   Navega a `http://localhost:5173` (o el puerto especificado por Vite) en tu navegador.

## 🤝 Contribución

¡Las contribuciones, problemas (issues) y solicitudes de nuevas características son bienvenidas! No dudes en revisar la página de issues.

---
*Construido con ❤️ usando React y Tailwind CSS.*
