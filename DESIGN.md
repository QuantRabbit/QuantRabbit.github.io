# Sistema de Diseno Editorial: GBM Media "The Idea"

Sistema de diseno editorial para el canal personal de ensayos de Juan Pablo Sanchez, inspirado directamente en la direccion de arte de **GBM Media "The Idea"** (`gbm.com/media/the-idea/`).

---

## 1. Filosofia Visual

- **Pureza tipografica sans-serif:** Sustituye las serifas clasicas por una tipografia de palo seco moderna, ejecutiva y tecnologica (`-apple-system`, `Segoe UI`, `Helvetica Neue`, `Arial`, `sans-serif`), transmitiendo la claridad y dinamismo de una fintech de inversion.
- **Jerarquia estilo The Idea:**
  - **Kicker de seccion:** Etiqueta superior en versalitas audaces (`THE IDEA`, `EDITORIAL`, `ECONOMIA`) con tracking abierto (`letter-spacing: 0.09em`) que contextualiza el ensayo antes del titular.
  - **Titular contundente:** Titulares en palo seco de gran escala (`font-size: 2.4rem`, `font-weight: 700`) con espaciado ajustado.
  - **Bajada ejecutiva destacada:** Parrafo introductorio de 21px / 1.2rem (`txt-21`) que sintetiza la tesis de inversion antes del cuerpo analitico.
  - **Barra de metadatos:** Formato tecnico en mayusculas compactas (`12 OCT 2026 · 5 MIN DE LECTURA · Por Juan Pablo Sanchez`) con filete divisorio inferior.
- **Lienzo y contraste:** Fondo blanco puro (`#ffffff`) con tinta profunda de alta definicion (`#1d1d20` y `#262629`).
- **Acentos GBM Media:**
  - Primario carbon institucional (`#1d1d20`).
  - Azul cobalto interactivo (`#424ee0`) para enlaces activos y transiciones.
  - Superficie sutil (`#f7f7f9`) para tarjetas, FAQ y bloque "En corto".
- **Bordes estructurados y pills:** Radios de esquina contenidos (`4px`) y etiquetas en pildora completa (`9999px`).
- **Modo oscuro nativo de terminal bursatil:** Fondo noche (`#111114`) con superficies en `#19191d` y texto claro (`#fcfcfd`).
- **Cero dependencias:** Funciona sin fuentes externas, librerias ni pasos de compilacion.
- **Cero guiones largos (em dashes).**

---

## 2. Tokens de Color

### Modo Claro (Lienzo GBM)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#ffffff` | Fondo principal blanco puro |
| `--surface-card` | `#f7f7f9` | Fondo de bloques destacados y tarjetas |
| `--surface-muted` | `#f0f0f4` | Fondo de etiquetas e indicadores |
| `--ink` | `#1d1d20` | Titulares y elementos de maxima jerarquia |
| `--body` | `#262629` | Texto corrido de lectura |
| `--body-strong` | `#111113` | Texto en negrita |
| `--muted` | `#5e5e68` | Metadatos, fechas y leyendas |
| `--accent` | `#1d1d20` | Carbon principal |
| `--accent-interactive` | `#424ee0` | Azul cobalto GBM Media |
| `--hairline` | `#e8e8ed` | Filetes de 1px entre secciones |

### Modo Oscuro (Terminal Digital)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#111114` | Fondo oscuro de terminal |
| `--surface-card` | `#19191d` | Tarjetas y bloques |
| `--surface-muted` | `#222228` | Etiquetas |
| `--ink` | `#fcfcfd` | Titulares blancos |
| `--body` | `#e0e0e6` | Texto corrido |
| `--muted` | `#9999a6` | Metadatos y fechas |
| `--accent-interactive` | `#6974f7` | Azul cobalto adaptado a fondo oscuro |
| `--hairline` | `#27272f` | Filetes divisorios |

---

## 3. Componentes Destacados

### A. Cabecera Minimalista
Filete inferior sutil de `1px solid var(--hairline)`, marca en palo seco de peso 800 y enlaces de navegacion directos.

### B. Bloque "En corto" (Optimizacion GEO)
Fondo `#f7f7f9`, filete lateral solido de `3.5px solid var(--ink)` y encabezado en versalitas. Sintesis de 3 a 5 puntos autosuficientes con unidad, ano y fuente explicita.

### C. Tarjetas de Articulo en Portada
- Kicker en mayusculas compactas (`THE IDEA` / `EDITORIAL`).
- Titular en palo seco bold.
- Resumen ejecutivo.
- Ficha de metadatos con fecha en mayusculas (`12 OCT 2026`) y tiempo de lectura (`5 MIN DE LECTURA`).
- Pildoras de etiquetas redondeadas (`border-radius: 9999px`).

### D. Preguntas Frecuentes (FAQPage)
Tarjetas rectangulares modulares de precision con fondo `#f7f7f9` y contorno fino de 1px.

### E. Modulo de Autor
Tarjeta de remate al pie con enlaces al perfil profesional y credenciales de Bombo.

---

## 4. Reglas Editoriales Irrenunciables

1. **Sin em dashes:** Queda estrictamente prohibido el uso del caracter guion largo (em dash). Se utilizan dos puntos, parentesis o guiones cortos comunes (-) cuando sea necesario.
2. **Redaccion directa por el autor:** Todos los ensayos los redacta Juan Pablo Sanchez a mano sin intermediacion de inteligencia artificial.
3. **Cifras rigurosas:** Toda cifra debe incluir magnitud, unidad, ano y fuente institucional primaria en la misma frase.
