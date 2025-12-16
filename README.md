# VetCare Pro - Sistema de Gestión Veterinaria

**Evaluación Final Transversal - Desarrollo Frontend II (PFY2202)**

VetCare Pro es una aplicación web moderna diseñada para optimizar la gestión de una clínica veterinaria. Permite a los usuarios visualizar y administrar información sobre clientes, pacientes (mascotas) y citas médicas de manera eficiente.

Este proyecto implementa una arquitectura robusta utilizando **React**, gestión de estado global con **Redux Toolkit**, y un backend simulado (Mock) utilizando **MSW (Mock Service Worker)** para demostrar la comunicación vía **REST** y **GraphQL**.

## 🚀 Características Principales

* **Gestión de Clientes:** Listado y visualización detallada de propietarios.
* **Gestión de Mascotas:** Registro de pacientes con detalles de especie y raza.
* **Agenda de Citas:** Visualización de citas programadas con **filtrado por fecha** (límite de 8 citas por día).
* **Arquitectura Híbrida:** Simulación de consumo de datos usando tanto **REST API** (para listados) como **GraphQL** (para detalles).
* **Diseño Responsivo:** Interfaz moderna y adaptable construida con **Tailwind CSS**.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, React Router DOM 7.
* **Estado:** Redux Toolkit.
* **Estilos:** Tailwind CSS 4.
* **Mock Backend:** MSW (Mock Service Worker).
* **Testing Unitario:** Jest, React Testing Library.
* **Testing E2E:** Cypress.
* **Build Tool:** Vite.

## 📋 Requisitos Previos

* Node.js (versión 18 o superior recomendada).
* npm (incluido con Node.js).

## 🔧 Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd mascotapp
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ▶️ Ejecución del Proyecto

Para iniciar el servidor de desarrollo local:

```bash
npm run dev
La aplicación estará disponible en http://localhost:5173.

Nota: MSW interceptará las peticiones de red en el navegador para simular el backend. Verás un mensaje en la consola del navegador indicando "[MSW] Mocking enabled".

🧪 Pruebas (Testing)
El proyecto cuenta con una suite completa de pruebas para asegurar la calidad del código, cumpliendo con los estándares de cobertura exigidos (>70% Unitarias, >50% E2E).

Pruebas Unitarias (Jest + RTL)
Ejecuta las pruebas unitarias para verificar la lógica de los componentes y el estado:

Bash

# Ejecutar todos los tests
npm test

# Ejecutar tests con reporte de cobertura
npm run test:coverage
Pruebas End-to-End (Cypress)
Ejecuta las pruebas de flujo completo (E2E) para verificar la navegación y los procesos críticos del usuario:

Bash

# Abrir interfaz interactiva de Cypress
npm run cy:open

# Ejecutar tests en modo consola (headless)
npm run cy:run
📂 Estructura del Proyecto
Plaintext

src/
├── assets/         # Recursos estáticos
├── components/     # Componentes UI reutilizables (Button, Card)
├── features/       # Módulos de negocio (Citas, Clientes, Mascotas)
│   ├── components/ # Componentes específicos del feature
│   ├── hooks/      # Custom hooks
│   └── pages/      # Páginas del feature
├── layouts/        # Diseños de página (MainLayout)
├── mocks/          # Configuración de MSW y handlers (REST/GraphQL)
├── pages/          # Páginas generales (HomePage)
├── store/          # Configuración de Redux y Slices
└── __tests__/      # Pruebas de integración de la App
📝 Autor
Desarrollado para la asignatura de Desarrollo Frontend II en Duoc UC.


### Recomendaciones adicionales para la entrega:

1.  **Crea el archivo:** Guarda este contenido en un archivo llamado `README.md` en la raíz de tu proyecto.
2.  **Repositorio:** Asegúrate de que tu repositorio en GitHub sea **público** para que el docente pueda acceder a él, tal como pide la pauta.
3.  **Verificación:** Antes de subirlo, lee la sección de "Instalación" y prueba seguir