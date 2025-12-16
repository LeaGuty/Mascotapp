describe("MascotApp E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })

  describe("Página de Inicio", () => {
    it("muestra el título de bienvenida", () => {
      // CAMBIO: El título real es "Bienvenido a VetCare Pro"
      cy.contains("Bienvenido a VetCare Pro").should("be.visible")
    })

    it("muestra las 3 cards de navegación", () => {
      // CAMBIO: Los títulos en las cards no tienen emojis en el texto (son SVGs aparte)
      cy.contains("Clientes").should("be.visible")
      cy.contains("Mascotas").should("be.visible")
      cy.contains("Citas").should("be.visible")
    })

    it("navega a la página de clientes al hacer clic", () => {
      // CAMBIO: Se busca el texto exacto del componente Card
      cy.contains("h2", "Clientes").click() 
      cy.url().should("include", "/clientes")
      // CAMBIO: El título en la página es "Gestión de Clientes"
      cy.contains("Gestión de Clientes").should("be.visible")
    })

    it("navega a la página de mascotas al hacer clic", () => {
      cy.contains("h2", "Mascotas").click()
      cy.url().should("include", "/mascotas")
      cy.contains("Gestión de Mascotas").should("be.visible")
    })

    it("navega a la página de citas al hacer clic", () => {
      cy.contains("h2", "Citas").click()
      cy.url().should("include", "/citas")
      cy.contains("Gestión de Citas").should("be.visible")
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
      // CAMBIO: El texto en el navbar es "VetCare Pro", no "MascotApp" ni tiene el emoji de huella en el texto
      cy.contains("VetCare Pro").click()
      cy.url().should("eq", "http://localhost:5173/")
    })
  })

  describe("Página de Clientes", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/clientes")
    })

    it("muestra el listado de clientes", () => {
      // CAMBIO: El texto en la UI es "Listado de Clientes" o "Listado via"
      cy.contains("Listado de Clientes").should("be.visible")
      cy.contains("Juan Pérez").should("be.visible")
      cy.contains("María García").should("be.visible")
    })

    it("muestra indicadores de REST y GraphQL", () => {
      cy.contains("REST API").should("be.visible")
      cy.contains("GraphQL").should("be.visible")
    })

    it("muestra el panel de detalle vacío inicialmente", () => {
      // CAMBIO: El texto real es más largo
      cy.contains("Selecciona un cliente para ver su información completa").should("be.visible")
    })

    it("muestra el detalle al seleccionar un cliente", () => {
      cy.contains("Juan Pérez").click()
      // CAMBIO: El título del panel es "Detalle del Cliente"
      cy.contains("Detalle del Cliente").should("be.visible")
      // Verificar que se carga información del detalle
      cy.contains("Teléfono:").should("be.visible")
    })
  })

  describe("Página de Mascotas", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/mascotas")
    })

    it("muestra el listado de mascotas", () => {
      // CAMBIO: El título en la UI es "Listado de Pacientes"
      cy.contains("Listado de Pacientes").should("be.visible")
      cy.contains("Max").should("be.visible")
    })

    it("muestra la especie de cada mascota", () => {
      cy.contains("Perro").should("be.visible")
    })

    it("muestra el detalle al seleccionar una mascota", () => {
      cy.contains("Max").click()
      // CAMBIO: El título del panel es "Detalle del Paciente"
      cy.contains("Detalle del Paciente").should("be.visible")
    })
  })

  describe("Página de Citas", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/citas")
    })

    it("muestra el título y filtro de fecha", () => {
      // CAMBIO: El título es "Citas Programadas", no "Citas del Día"
      cy.contains("Citas Programadas").should("be.visible")
      cy.contains("Filtrar por fecha:").should("be.visible")
    })

    it("muestra el selector de fecha con la fecha actual", () => {
      cy.get('input[type="date"]').should("be.visible")
    })

    it("muestra las citas del día", () => {
      cy.contains("09:00").should("be.visible")
    })

    it("muestra el estado de las citas", () => {
      cy.contains("Confirmada").should("be.visible")
    })

    it("permite cambiar la fecha", () => {
      cy.get('input[type="date"]').clear().type("2024-01-01")
      cy.contains("No hay citas programadas para esta fecha").should("be.visible")
    })
  })

  describe("Flujo Completo de Usuario", () => {
    it("permite navegar por toda la aplicación", () => {
      // 1. Inicio
      cy.contains("Bienvenido a VetCare Pro").should("be.visible")

      // 2. Ver clientes
      // Usamos el texto exacto sin emoji
      cy.contains("h2", "Clientes").click() 
      cy.contains("Juan Pérez").should("be.visible")
      
      // En tu componente, el botón dice "Ver detalle completo", no "Ver detalle"
      cy.contains("Ver detalle completo").first().click()

      // 3. Ver mascotas
      cy.get("nav").contains("Mascotas").click()
      cy.contains("Max").should("be.visible")

      // 4. Ver citas
      cy.get("nav").contains("Citas").click()
      cy.contains("Citas Programadas").should("be.visible")

      // 5. Volver al inicio
      cy.contains("VetCare Pro").click()
      cy.contains("Bienvenido a VetCare Pro").should("be.visible")
    })
  })
})