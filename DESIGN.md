# Sistema de Diseno Editorial: Juan Pablo Sanchez (Ensayos)

Sistema de diseno editorial adaptado a partir del analisis de **Claude / Anthropic** en `awesome-design-md`, optimizado para un sitio personal de ensayos sobre economia, politica, inversion y finanzas para fundadores y directores generales.

---

## 1. Filosofia Visual

- **Lienzo calido y humano:** Fondo crema calido (`#faf9f5`) en lugar de blancos frios o grises clinicos.
- **Acento terracota / coral:** Un unico color de enfasis (`#cc785c`) para llamadas de atencion ("En corto"), citas y enlaces destacados.
- **Voz tipografica hibrida:**
  - Titulares en serifa display (`Charter`, `Iowan Old Style`, `Georgia`, `serif`) con peso regular (400), tracking ligeramente negativo y autoridad literaria.
  - Texto de lectura y navegacion en palo seco humanista de alta legibilidad (`-apple-system`, `Inter`, `Segoe UI`, `sans-serif`).
  - Cifras tecnicas y codigo en monoespacio (`ui-monospace`, `JetBrains Mono`, `monospace`).
- **Una sola columna estricta:** Ancho optimo de 65 a 75 caracteres (`max-width: 68ch`) para maxima comprension lectora.
- **Cero dependencias:** Funciona sin fuentes externas, librerias ni pasos de compilacion.
- **Modo oscuro nativo:** Superficie carbon calido (`#171614`) con texto en marfil (`#faf9f5`) y preservacion del tono terracota.

---

## 2. Tokens de Color

### Modo Claro (Lienzo Crema)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#faf9f5` | Fondo principal de la pagina (lienzo crema calido) |
| `--surface-card` | `#f5f0e8` | Fondo de bloques destacados, "En corto", FAQ y autor |
| `--surface-cream` | `#efe9de` | Pildoras de etiquetas y fondos sutiles |
| `--ink` | `#141413` | Titulares y texto de maxima jerarquia |
| `--body` | `#3d3d3a` | Texto corrido de lectura |
| `--body-strong` | `#252523` | Negritas y frases con enfasis |
| `--muted` | `#6c6a64` | Metadatos, fechas, enlaces secundarios |
| `--muted-soft` | `#8e8b82` | Textos al pie y leyendas |
| `--primary` | `#cc785c` | Acento terracota editorial |
| `--primary-hover` | `#a9583e` | Hover de enlaces y botones |
| `--hairline` | `#e6dfd8` | Filetes y bordes divisorios sutiles |

### Modo Oscuro (Superficie Calida)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#171614` | Fondo carbon calido |
| `--surface-card` | `#201e1a` | Tarjetas y contenedores |
| `--surface-cream` | `#282520` | Etiquetas y badges |
| `--ink` | `#faf9f5` | Titulares y texto primario |
| `--body` | `#d5d1c8` | Texto corrido |
| `--body-strong` | `#f3efe6` | Texto con enfasis |
| `--muted` | `#9e9a91` | Fechas y metadatos |
| `--primary` | `#df886b` | Terracota adaptado para contraste oscuro |
| `--hairline` | `#322f29` | Bordes en modo oscuro |

---

## 3. Escala Tipografica y Jerarquia

| Elemento | Pila Tipografica | Tamano | Peso | Altura de linea | Tracking |
|---|---|---|---|---|---|
| **h1 (Titular)** | Serifa editorial | 2.35rem (~42px) | 400 (regular) | 1.18 | -0.02em |
| **h2 (Secciones)** | Serifa editorial | 1.55rem (~28px) | 400 (regular) | 1.30 | -0.018em |
| **h3 (Subtitulos)** | Serifa editorial | 1.25rem (~22px) | 400 (regular) | 1.35 | -0.01em |
| **Subtitulo / Bajada** | Palo seco | 1.15rem (~20px) | 400 | 1.50 | 0 |
| **Texto corrido (p)** | Palo seco | 1.0625rem (~19px) | 400 | 1.72 | 0 |
| **En corto / Bullets** | Palo seco | 1.00rem (~18px) | 400 | 1.62 | 0 |
| **Etiquetas (Pills)** | Palo seco | 0.75rem (~13.5px) | 500 | 1.00 | +0.01em |
| **Metadatos y Fechas** | Palo seco | 0.875rem (~15.7px) | 400 | 1.40 | 0 |
| **Cita (blockquote)** | Serifa editorial | 1.15rem (~20px) | 400 itálica | 1.55 | 0 |
| **Codigo / Datos** | Monoespacio | 0.88em | 400 | 1.60 | 0 |

---

## 4. Componentes Refinados

### A. Bloque "En corto" (Optimizacion GEO)
- Tarjeta con fondo `--surface-card`, borde perimetral sutil `--hairline` y borde izquierdo acentuado de `3.5px solid var(--primary)`.
- Titulo en versalitas / mayusculas compactas (`font-size: 0.8rem`, `letter-spacing: 0.09em`, color `--primary`).
- Puntos autosuficientes que cualquier persona o motor de IA puede citar aisladamente con contexto completo.

### B. Tarjetas de Preguntas Frecuentes (FAQPage)
- Contenedores independientes con radio de `6px`, borde `--hairline` y fondo `--surface-card`.
- Pregunta destacada en palo seco semibold (`font-weight: 600`, color `--ink`).
- Respuesta concisa y citable.

### C. Citas Textuales (`blockquote`)
- Borde izquierdo terracota de `3px`.
- Fondo sutil `--surface-card` con bordes derechos redondeados (`0 6px 6px 0`).
- Tipografia serif en cursiva para transmitir peso reflexivo.

### D. Pildoras de Etiquetas (`.etiqueta`)
- Radio completo de pildora (`border-radius: 9999px`).
- Fondo `--surface-cream`, texto `--muted`, borde `--hairline`.

### E. Modulo de Autor
- Tarjeta de cierre al pie del articulo con radio `10px`, borde `--hairline` y enlace destacado en terracota hacia `sobre-mi.html`.

---

## 5. Reglas Editoriales Irrenunciables

1. **Sin em dashes:** Queda estrictamente prohibido el uso del caracter guion largo (em dash). Se utilizan dos puntos, parentesis o guiones cortos comunes (-) cuando sea necesario.
2. **Redaccion directa por el autor:** Todos los borradores los escribe Juan Pablo Sanchez sin intermediacion de modelos de lenguaje.
3. **Cifras completas:** Toda metrica o dato cuantitativo debe incluir unidad, ano y fuente institucional primaria en la misma frase.
