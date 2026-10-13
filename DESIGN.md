# Sistema de Diseno Editorial: GBM / WSJ

Sistema de diseno editorial para el canal personal de ensayos de Juan Pablo Sanchez. Fusiona la autoridad periodistica clasica de **The Wall Street Journal (WSJ)** con la precision visual y minimalismo digital de **GBM (Grupo Bursatil Mexicano)**.

---

## 1. Filosofia Visual

- **Contraste bursatil absoluto:** Fondo blanco nitido (`#ffffff`) con tipografia en negro profundo (`#0a0a0a` y `#171717`). Sin tonos crema, marfil ni calidos artificiales.
- **Cabecera maestra estilo primera plana:** Doble filete maestro (solido superior de 3.5px y fino inferior de 1px) caracteristico de la prensa financiera internacional.
- **Acentos institucionales:**
  - Azul marino corporativo (`#002b49`): Color institucional presente en la banca de inversion y fintech.
  - Indicador verde bursatil (`#059669`): Marcador discreto de mercado en el bloque "En corto" para senalizar sintesis y rendimiento.
- **Voz tipografica hibrida de prensa y fintech:**
  - Titulares y lectura en serifa editorial firme (`Georgia`, `Cambria`, `Times New Roman`, `serif`) con peso 700 en titulares.
  - Navegacion, metadatos, etiquetas y fichas tecnicas en palo seco estructurado (`-apple-system`, `Segoe UI`, `Roboto`, `sans-serif`) con versalitas compactas.
- **Precision geometrica en bordes:** Radios contenidos (`2px` a `4px`) que proyectan estructura analitica y eliminan redondeos organicos.
- **Modo oscuro de terminal bursatil:** Fondo noche profunda (`#0a0e17`) con tarjetas en azul pizarra (`#111827`) e indicadores cian/esmeralda.

---

## 2. Tokens de Color

### Modo Claro

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#ffffff` | Fondo principal blanco puro |
| `--surface-card` | `#f9fafb` | Fondo de bloques destacados y tarjetas |
| `--surface-muted` | `#f3f4f6` | Fondo de etiquetas e indicadores |
| `--ink` | `#0a0a0a` | Titulares y elementos de maxima jerarquia |
| `--body` | `#171717` | Texto de lectura de alto contraste |
| `--muted` | `#525252` | Metadatos, fechas y navegacion |
| `--primary` | `#002b49` | Azul marino corporativo GBM |
| `--accent-market` | `#059669` | Verde bursatil sutil |
| `--hairline` | `#e5e7eb` | Filete de 1px entre secciones |
| `--hairline-dark` | `#0a0a0a` | Filete negro de cabecera y citas |

### Modo Oscuro

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#0a0e17` | Fondo noche de terminal financiera |
| `--surface-card` | `#111827` | Superficie de tarjetas y fichas |
| `--surface-muted` | `#1e293b` | Fondo de etiquetas |
| `--ink` | `#ffffff` | Titulares en blanco puro |
| `--body` | `#e5e7eb` | Texto corrido de alta legibilidad |
| `--muted` | `#9ca3af` | Metadatos y fechas |
| `--primary` | `#38bdf8` | Azul cielo para acentos oscuros |
| `--accent-market` | `#34d399` | Verde esmeralda para indicadores |
| `--hairline` | `#1f293d` | Bordes en modo oscuro |

---

## 3. Componentes Destacados

### A. Cabecera Maestra (Broadsheet WSJ)
Filete superior de `3.5px solid var(--hairline-dark)` y filete inferior de `1px solid var(--hairline-dark)`. Tipografia titular en serifa con navegacion en versalitas limpias (`letter-spacing: 0.06em`).

### B. Bloque "En corto" (Key Takeaways)
Fondo `#f9fafb`, contorno de `1px`, filete superior en azul marino (`#002b49`) y encabezado con punto verde bursatil (`#059669`). Frases autosuficientes con unidad, ano y fuente institucional explícita.

### C. Bloques de Cita (`blockquote`)
Filete lateral de `3px solid var(--hairline-dark)` con texto en serifa cursiva de 1.2rem y cita en versalitas tecnicas.

### D. Preguntas Frecuentes (FAQPage)
Tarjetas modulares de contorno fino con pregunta en palo seco semibold y respuesta en serifa legible.

### E. Modulo de Autor
Tarjeta de pie con filete superior marino de `2px` y enlace en palo seco hacia `sobre-mi.html`.

---

## 4. Reglas Editoriales Irrenunciables

1. **Sin em dashes:** Queda estrictamente prohibido el uso del caracter guion largo (em dash). Se utilizan dos puntos, parentesis o guiones cortos comunes (-) cuando sea necesario.
2. **Redaccion directa por el autor:** Todos los ensayos los redacta Juan Pablo Sanchez a mano sin intermediacion de inteligencia artificial.
3. **Cifras rigurosas:** Toda cifra debe incluir magnitud, unidad, ano y fuente institucional primaria en la misma frase.
