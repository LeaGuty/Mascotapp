describe("MascotApp E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })

  describe("Página de Inicio", () => {
    it("muestra el título de bienvenida", () => {
      cy.contains("Bienvenido a MascotApp").should("be.visible")
    })

    it("muestra las 3 cards de navegación", () => {
      cy.contains("👥 Clientes").should("be.visible")
      cy.contains("🐕 Mascotas").should("be.visible")
      cy.contains("📅 Citas").should("be.visible")
    })

    it("navega a la página de clientes al hacer clic", () => {
      cy.contains("👥 Clientes").click()
      cy.url().should("include", "/clientes")
      cy.contains("Clientes").should("be.visible")
    })

    it("navega a la página de mascotas al hacer clic", () => {
      cy.contains("🐕 Mascotas").click()
      cy.url().should("include", "/mascotas")
      cy.contains("Mascotas").should("be.visible")
    })

    it("navega a la página de citas al hacer clic", () => {
      cy.contains("📅 Citas").click()
      cy.url().should("include", "/citas")
      cy.contains("Citas del Día").should("be.visible")
    })
  })

  describe("Navegación por Navbar", () => {
    it("navega usando los links del navbar", () => {
      // Ir a Clientes
      cy.get("nav").contains("Clientes").click()
      cy.url().should("include", "/clientes")

      // Ir a Mascotas
      cy.get("nav").contains("Mascotas").click()
      cy.url().should("include", "/mascotas")

      // Ir a Citas
      cy.get("nav").contains("Citas").click()
      cy.url().should("include", "/citas")

      // Volver al inicio con el logo
      cy.contains("🐾 MascotApp").click()
      cy.url().should("eq", "http://localhost:5173/")
    })
  })

  describe("Página de Clientes", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/clientes")
    })

    it("muestra el listado de clientes", () => {
      cy.contains("Listado (REST)").should("be.visible")
      cy.contains("Juan Pérez").should("be.visible")
      cy.contains("María García").should("be.visible")
    })

    it("muestra indicadores de REST y GraphQL", () => {
      cy.contains("REST API").should("be.visible")
      cy.contains("GraphQL").should("be.visible")
    })

    it("muestra el panel de detalle vacío inicialmente", () => {
      cy.contains("Selecciona un cliente para ver su detalle").should("be.visible")
    })

    it("muestra el detalle al seleccionar un cliente", () => {
      cy.contains("Juan Pérez").click()
      cy.contains("Detalle (GraphQL)").should("be.visible")
      // Verificar que se carga información del detalle
      cy.contains("Teléfono:").should("be.visible")
    })
  })

  describe("Página de Mascotas", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/mascotas")
    })

    it("muestra el listado de mascotas", () => {
      cy.contains("Listado (REST)").should("be.visible")
      cy.contains("Max").should("be.visible")
    })

    it("muestra la especie de cada mascota", () => {
      cy.contains("Perro").should("be.visible")
    })

    it("muestra el detalle al seleccionar una mascota", () => {
      cy.contains("Max").click()
      cy.contains("Detalle (GraphQL)").should("be.visible")
    })
  })

  describe("Página de Citas", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/citas")
    })

    it("muestra el título y filtro de fecha", () => {
      cy.contains("Citas del Día").should("be.visible")
      cy.contains("Filtrar por fecha:").should("be.visible")
    })

    it("muestra el selector de fecha con la fecha actual", () => {
      cy.get('input[type="date"]').should("be.visible")
    })

    it("muestra las citas del día", () => {
      // Las citas mock están configuradas para el día actual
      cy.contains("09:00").should("be.visible")
    })

    it("muestra el estado de las citas", () => {
      cy.contains("Confirmada").should("be.visible")
    })

    it("permite cambiar la fecha", () => {
      cy.get('input[type="date"]').clear().type("2024-01-01")
      // Al cambiar a una fecha sin citas, debería mostrar mensaje
      cy.contains("No hay citas programadas para esta fecha").should("be.visible")
    })
  })

  describe("Flujo Completo de Usuario", () => {
    it("permite navegar por toda la aplicación", () => {
      // 1. Inicio
      cy.contains("Bienvenido a MascotApp").should("be.visible")

      // 2. Ver clientes
      cy.contains("👥 Clientes").click()
      cy.contains("Juan Pérez").should("be.visible")
      cy.contains("Ver detalle").first().click()

      // 3. Ver mascotas
      cy.get("nav").contains("Mascotas").click()
      cy.contains("Max").should("be.visible")

      // 4. Ver citas
      cy.get("nav").contains("Citas").click()
      cy.contains("Citas del Día").should("be.visible")

      // 5. Volver al inicio
      cy.contains("🐾 MascotApp").click()
      cy.contains("Bienvenido a MascotApp").should("be.visible")
    })
  })
})