# Sistema de Diseno Editorial Clasico Financiero (WSJ / Financial Times)

Sistema de diseno editorial para el canal personal de ensayos de Juan Pablo Sanchez sobre economia, politica, inversion y finanzas para fundadores y directores generales.

---

## 1. Filosofia Visual

- **Prensa financiera de alto contraste:** Fondo blanco puro (`#ffffff`) con tipografia oscura en tinta de obsidiana (`#0f172a` y `#1e293b`) que transmite rigor analitico y sobriedad institucional.
- **Acento azul marino financiero:** Tono sobrio (`#0f2942`) para filetes maestros, cabeceras del bloque "En corto" y citas, sustituyendo cualquier estetica de calidez artificial por gravedad corporativa.
- **Voz tipografica de prensa:**
  - Titulares firmes y texto de lectura en serifa editorial periodistica (`Georgia`, `Cambria`, `Times New Roman`, `serif`).
  - Navegacion, metadatos, etiquetas y versalitas tecnicas en palo seco estructurado (`-apple-system`, `Segoe UI`, `Roboto`, `sans-serif`).
  - Codigo y series numericas en monoespacio del sistema (`ui-monospace`, `SF Mono`, `Menlo`, `monospace`).
- **Ancho de lectura estricto:** Una sola columna de 65 a 75 caracteres (`max-width: 68ch`).
- **Cero dependencias:** 100% libre de frameworks, CDNs y tipografias externas. Carga instantanea y compatible con apertura local por doble clic.
- **Modo noche sobrio:** Fondo pizarra noche (`#090d16`) con tarjetas en grafito (`#111827`) y azul acero (`#38bdf8`) para preservar el contraste en ambientes oscuros.

---

## 2. Tokens de Color

### Modo Claro (Prensa de Alto Contraste)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#ffffff` | Fondo principal blanco limpio |
| `--surface-card` | `#f8fafc` | Fondo de bloques destacados, "En corto", FAQ y autor |
| `--surface-muted` | `#f1f5f9` | Fondo de etiquetas y elementos secundarios |
| `--ink` | `#0f172a` | Titulares y texto de maxima jerarquia |
| `--body` | `#1e293b` | Texto corrido de lectura de alto contraste |
| `--body-strong` | `#0f172a` | Texto en negrita |
| `--muted` | `#475569` | Metadatos, fechas y navegacion |
| `--muted-soft` | `#64748b` | Leyendas secundarias |
| `--primary` | `#0f2942` | Azul marino financiero clasico |
| `--primary-hover` | `#1e40af` | Azul de interaccion al pasar el cursor |
| `--hairline` | `#e2e8f0` | Filetes de 1px entre secciones |
| `--hairline-dark` | `#cbd5e1` | Subrayados sutiles de enlaces |

### Modo Oscuro (Pizarra Noche)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#090d16` | Fondo pizarra noche |
| `--surface-card` | `#111827` | Superficie de tarjetas y bloques |
| `--surface-muted` | `#1e293b` | Fondo de etiquetas |
| `--ink` | `#f8fafc` | Titulares blancos nitidos |
| `--body` | `#e2e8f0` | Texto corrido de lectura |
| `--body-strong` | `#ffffff` | Texto con enfasis |
| `--muted` | `#94a3b8` | Metadatos y fechas |
| `--primary` | `#38bdf8` | Azul acero para contraste nocturno |
| `--hairline` | `#1e293b` | Filetes en modo oscuro |

---

## 3. Escala Tipografica y Jerarquia

| Elemento | Pila Tipografica | Tamano | Peso | Line Height | Tracking |
|---|---|---|---|---|---|
| **Cabecera de marca** | Serifa periodistica | 1.35rem | 700 (negrita) | 1.00 | -0.015em |
| **h1 (Titular)** | Serifa periodistica | 2.25rem | 700 (negrita) | 1.20 | -0.015em |
| **h2 (Secciones)** | Serifa periodistica | 1.45rem | 700 (negrita) | 1.30 | -0.015em |
| **h3 (Subtitulos)** | Palo seco estructurado | 1.10rem | 650 (semibold) | 1.40 | 0 |
| **Texto corrido (p)** | Serifa periodistica | 1.125rem | 400 (regular) | 1.75 | 0 |
| **En corto / Puntos** | Palo seco estructurado | 0.95rem | 400 | 1.60 | 0 |
| **Etiquetas** | Palo seco versalitas | 0.725rem | 600 | 1.00 | +0.05em |
| **Metadatos y Fechas** | Palo seco estructurado | 0.85rem | 600 | 1.40 | +0.05em |
| **Citas (blockquote)** | Serifa periodistica | 1.20rem | 400 itálica | 1.60 | 0 |

---

## 4. Componentes Clave

### A. Cabecera Maestra
- Filete inferior firme de `2px solid var(--ink)` que evoca la primera plana de un periodico financiero.
- Titulo en serifa de autoridad y enlaces de navegacion en versalitas limpias con espaciado equilibrado.

### B. Bloque "En corto" (Optimizacion GEO)
- Tarjeta rectangular con fondo pizarra suave (`#f8fafc`), borde perimetral de `1px` y filete superior de `3px solid var(--primary)`.
- Titulo "EN CORTO" en versalitas azules (`#0f2942`) con tracking abierto.
- Puntos sinteticos autocontenidos listos para extraccion por lectores y motores generativos.

### C. Bloques de Cita (`blockquote`)
- Filete lateral marino de `3px solid var(--primary)` sobre fondo limpio.
- Serifa cursiva de 1.2rem con atribucion en versalitas sobrias.

### D. Preguntas Frecuentes (FAQPage)
- Tarjetas modulares de contorno fino (`1px solid var(--hairline)`) con pregunta en palo seco semibold y respuesta en serifa legible.

### E. Modulo de Autor
- Tarjeta de remate al pie con filete superior marino de `2px solid var(--primary)` y enlace institucional a `sobre-mi.html`.

---

## 5. Reglas Editoriales Irrenunciables

1. **Sin em dashes:** Queda estrictamente prohibido el uso del caracter guion largo (em dash). Se utilizan dos puntos, parentesis o guiones cortos comunes (-) cuando sea necesario.
2. **Redaccion directa por el autor:** Todos los ensayos los redacta Juan Pablo Sanchez a mano sin intermediacion de inteligencia artificial.
3. **Cifras rigurosas:** Toda cifra debe incluir magnitud, unidad, ano y fuente institucional primaria en la misma frase.
