# Sistema de Diseno Editorial: GBM Media "The Idea" / WSJ

Sistema de diseno editorial para el canal personal de ensayos del autor, inspirado directamente en la direccion de arte de **GBM Media "The Idea"** (`gbm.com/media/the-idea/`) y Wall Street Journal.

---

## 1. Filosofia Visual

- **Pureza tipografica sans-serif:** Sustituye las serifas clasicas por una tipografia de palo seco moderna, ejecutiva y tecnologica (`-apple-system`, `Segoe UI`, `Helvetica Neue`, `Arial`, `sans-serif`), transmitiendo la claridad y dinamismo de una publicacion de inteligencia financiera.
- **Jerarquia visual GBM Media:**
  - **Cabecera Masthead:** Monograma de marca (`QR`), nombre institucional, cargo (`ENSAYOS`), fecha del dia y selector de tema.
  - **Subnavegacion horizontal:** Enlaces rapidos con filete inferior sutil.
  - **Hero Intro:** Titular en versalitas audaces (`THE IDEA / ENSAYOS`), kicker de seccion (`EDITORIAL`) y bajada ejecutiva explicativa (`txt-21`) de alto contraste.
  - **Tarjeta Destacada (archive__featured):** Contenedor prominente con badge en pildora (`NUEVO`), titular en gran escala, resumen ejecutivo, metadatos tecnicos (`12 OCT 2026 · 4 MIN DE LECTURA ·`) y pildoras de etiquetas.
  - **Cuadricula de Publicaciones (archive__grid):** Tarjetas estructuradas con bordes de 1px, superficies contrastadas y elevacion sutil en interaccion.
- **Dualidad de temas con selector manual y automatico:**
  - **Modo Claro (GBM Media signature):** Lienzo blanco puro (`#ffffff`), tarjetas en pizarra ultra suave (`#f8f9fb`), tinta profunda (`#121316`) y acento azul cobalto (`#424ee0`).
  - **Modo Oscuro (Terminal bursatil de alta definicion):** Fondo carbon pizarra (`#0c0d12`), superficies de tarjetas en relieve (`#141620`), filetes definidos (`#242636`) y cobalto electrico (`#6974f7`).
- **Cero dependencias externas:** Sin Google Fonts, librerias pesadas ni CDNs.
- **Cero guiones largos (em dashes):** Regla absoluta de estilo editorial.

---

## 2. Tokens de Color

### Modo Claro (Lienzo GBM Media)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#ffffff` | Fondo principal blanco puro |
| `--surface-header` | `#ffffff` | Cabecera con efecto de desenfoque |
| `--surface-card` | `#f8f9fb` | Superficie de tarjetas y contenedores |
| `--surface-card-hover` | `#ffffff` | Estado interactivo al posar el cursor |
| `--surface-muted` | `#f0f2f6` | Fondo de etiquetas secundarias y badges |
| `--surface-callout` | `#f5f6fa` | Fondo del bloque ejecutivo "En corto" |
| `--ink` | `#121316` | Titulares y elementos de maxima jerarquia |
| `--body` | `#25272e` | Texto corrido de lectura |
| `--muted` | `#5e6272` | Metadatos, fechas y leyendas |
| `--accent-interactive` | `#424ee0` | Azul cobalto GBM Media |
| `--hairline` | `#e6e8ed` | Filetes divisorios de precision (1px) |

### Modo Oscuro (Terminal Digital)

| Token | Valor Hex | Uso |
|---|---|---|
| `--canvas` | `#0c0d12` | Fondo carbon pizarra profundo |
| `--surface-card` | `#141620` | Superficie de tarjetas en relieve |
| `--surface-card-hover` | `#191c28` | Estado interactivo al posar el cursor |
| `--surface-muted` | `#1c1e2b` | Etiquetas |
| `--surface-callout` | `#161824` | Fondo del bloque "En corto" |
| `--ink` | `#ffffff` | Titulares blancos |
| `--body` | `#d5d8e4` | Texto corrido de alta legibilidad |
| `--muted` | `#8c91a4` | Metadatos y fechas |
| `--accent-interactive` | `#6974f7` | Azul cobalto adaptado para contraste oscuro |
| `--hairline` | `#242636` | Filetes divisorios |

---

## 3. Componentes y Patrones

### A. Cabecera Masthead y Subnavegacion
Monograma `QR`, nombre completo en mayusculas tecnicas, bloque de fecha del dia y selector de tema (`☀️ CLARO` / `🌙 OSCURO`) con guardado en `localStorage`.

### B. Tarjeta Destacada (archive__featured)
El ensayo mas reciente se presenta en un modulo destacado con badge `NUEVO`, kicker en azul cobalto, titular contundente, sintesis de lectura y metadatos completos.

### C. Cuadricula de Ensayos (archive__grid)
Articulos secundarios dispuestos en tarjetas modulares con filete fino, kicker tematico y etiquetas de categoria en formato pildora (`9999px`).

### D. Bloque "En corto" (Optimizacion GEO)
Modulo de sintesis ejecutiva con borde izquierdo acentuado en cobalto (`4px solid var(--accent-interactive)`). Formula entre 3 y 5 puntos autosuficientes con magnitud, unidad, ano y fuente institucional.

### E. Vista de Lectura y Boton de Retorno
En `articulo.html`, boton pill de regreso (`← Regresar a Ensayos`), titular de gran escala (`ttl-41-700`), barra de herramientas para compartir (WhatsApp, LinkedIn, X, Copiar enlace) y tarjeta de autor con avatar monograma.

---

## 4. Reglas Editoriales Irrenunciables

1. **Cero em dashes:** Prohibido el caracter guion largo (em dash). Se emplean dos puntos, puntos centrados (`·`), parentesis o guiones cortos convencionales (-).
2. **Autor sin IA:** Todos los ensayos se redactan directamente por el autor desde el primer borrador.
3. **Cifras rigurosas:** Toda estadistica incluye ano y fuente primaria institucional (Banxico, INEGI, CNBV, SHCP) en la misma oracion.
