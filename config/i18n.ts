import type { Localized, SectionId } from "./site.types";

interface UiStrings {
  nav: Record<SectionId, Localized>;
  languageToggle: { label: Localized };
  menu: { open: Localized; close: Localized; label: Localized };
  carousel: { previous: Localized; next: Localized; goTo: Localized };
  benefits: { flipHint: Localized; backLabel: Localized };
  maintenance: { dragHint: Localized };
  footer: { rights: Localized; visit: Localized };
}

export const ui: UiStrings = {
  nav: {
    hero: { es: "Inicio", en: "Home" },
    scope: { es: "El agente", en: "The agent" },
    benefits: { es: "Beneficios", en: "Benefits" },
    process: { es: "Etapas", en: "Stages" },
    includes: { es: "Incluye", en: "Includes" },
    maintenance: { es: "Mantenimiento", en: "Maintenance" },
    investment: { es: "Inversión", en: "Investment" },
    nextSteps: { es: "Próximos pasos", en: "Next steps" },
    closing: { es: "Cierre", en: "Closing" },
  },
  languageToggle: {
    label: { es: "Cambiar idioma", en: "Switch language" },
  },
  menu: {
    open: { es: "Abrir menú", en: "Open menu" },
    close: { es: "Cerrar menú", en: "Close menu" },
    label: { es: "Índice del presupuesto", en: "Proposal index" },
  },
  carousel: {
    previous: { es: "Anterior", en: "Previous" },
    next: { es: "Siguiente", en: "Next" },
    goTo: { es: "Ir a la tarjeta", en: "Go to card" },
  },
  benefits: {
    flipHint: { es: "Tocá una tarjeta para girarla", en: "Tap a card to flip it" },
    backLabel: { es: "Beneficio", en: "Benefit" },
  },
  maintenance: {
    dragHint: { es: "Arrastrá para girar", en: "Drag to rotate" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    visit: { es: "Visitá nuestra web", en: "Visit our website" },
  },
};
