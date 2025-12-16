# 🐾 VetCare Pro - Sistema de Gestión Veterinaria

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-Mock_Service_Worker-FF6A33?logo=mockserviceworker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Target%20%3E70%25-C21325?logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-Target%20%3E50%25-17202C?logo=cypress&logoColor=white)

**Evaluación Final Transversal - Desarrollo Frontend II (PFY2202)**

VetCare Pro es una aplicación web moderna diseñada para optimizar la gestión de una clínica veterinaria. Permite a los usuarios visualizar y administrar información sobre clientes, pacientes (mascotas) y citas médicas de manera eficiente.

Este proyecto implementa una arquitectura robusta utilizando **React**, gestión de estado global con **Redux Toolkit**, y un backend simulado (Mock) utilizando **MSW (Mock Service Worker)** para demostrar la comunicación vía **REST** y **GraphQL**.

---

## 📑 Tabla de Contenidos

1. [🚀 Características Principales](#-características-principales)
2. [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
3. [📋 Requisitos Previos](#-requisitos-previos)
4. [🔧 Instalación](#-instalación)
5. [▶️ Ejecución del Proyecto](#️-ejecución-del-proyecto)
6. [🧪 Pruebas (Testing)](#-pruebas-testing)
7. [📂 Estructura del Proyecto](#-estructura-del-proyecto)
8. [📝 Autor](#-autor)

---

## 🚀 Características Principales

*   👥 **Gestión de Clientes:** Listado y visualización detallada de propietarios.
*   🐶 **Gestión de Mascotas:** Registro de pacientes con detalles de especie y raza.
*   📅 **Agenda de Citas:** Visualización de citas programadas con **filtrado por fecha** (límite de 8 citas por día).
*   🔄 **Arquitectura Híbrida:** Simulación de consumo de datos usando tanto **REST API** (para listados) como **GraphQL** (para detalles).
*   📱 **Diseño Responsivo:** Interfaz moderna y adaptable construida con **Tailwind CSS**.

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Versión | Descripción |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | ^19.2.0 | Biblioteca principal de UI |
| **Enrutamiento** | React Router DOM | ^7.10.1 | Navegación SPA |
| **Estado** | Redux Toolkit | ^2.11.2 | Gestión de estado global |
| **Estilos** | Tailwind CSS | ^4.1.18 | Framework de utilidades CSS |
| **Mock Backend** | MSW | ^2.12.4 | Intercepción de peticiones (REST/GraphQL) |
| **Build Tool** | Vite | ^7.2.4 | Entorno de desarrollo rápido |
| **Testing** | Jest / RTL | ^30.2.0 | Pruebas Unitarias |
| **E2E** | Cypress | ^15.7.1 | Pruebas de End-to-End |

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
*   [npm](https://www.npmjs.com/) (generalmente incluido con Node.js).
*   Un navegador web moderno (Chrome, Firefox, Edge).

---

## 🔧 Instalación

Sigue estos pasos para configurar el proyecto localmente:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd mascotapp
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

---

## ▶️ Ejecución del Proyecto

Para iniciar el servidor de desarrollo local:

```bash
npm run dev
```

> **Nota:** La aplicación estará disponible en `http://localhost:5173`. MSW interceptará las peticiones de red en la consola del navegador, donde verás el mensaje: `[MSW] Mocking enabled`.

---

## 🧪 Pruebas (Testing)

El proyecto cuenta con una suite completa de pruebas para asegurar la calidad del código, cumpliendo con los estándares de cobertura exigidos (>70% Unitarias, >50% E2E).

### Pruebas Unitarias (Jest + RTL)

Verifican la lógica de los componentes y el estado.

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

### Pruebas End-to-End (Cypress)

Verifican la navegación y los flujos críticos del usuario.

```bash
# Abrir interfaz interactiva de Cypress
npm run cy:open

# Ejecutar tests en modo consola (headless)
npm run cy:run
```

---

## 📂 Estructura del Proyecto

```plaintext
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes UI reutilizables (Button, Card, Layouts básicos)
├── features/        # Módulos de negocio (Arquitectura Feature-Based)
│   ├── citas/       # Funcionalidad de agenda y citas
│   ├── clientes/    # Funcionalidad de gestión de clientes
│   └── mascotas/    # Funcionalidad de gestión de pacientes
├── layouts/         # Diseños de página globales (MainLayout, DashboardLayout)
├── mocks/           # Configuración de MSW
│   ├── handlers/    # Manejadores para REST y GraphQL
│   └── data/        # Datos simulados (JSON)
├── pages/           # Páginas generales (HomePage, NotFound)
├── store/           # Configuración del Store de Redux
└── __tests__/       # Pruebas de integración a nivel de aplicación
```

---

## 📝 Autor

Desarrollado por **Leandro Gutiérrez** para la asignatura de **Desarrollo Frontend II** en **Duoc UC**.

> Este proyecto es confines educativos y de evaluación.