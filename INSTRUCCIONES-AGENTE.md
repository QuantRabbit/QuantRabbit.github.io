# Instrucciones para el agente: sitio personal de ensayos

Tarea para Antigravity. Trabaja en esta carpeta: `/Users/juanpablo/Desktop/sitio-personal` (ya existe, con git inicializado y un README). No es el workspace de Series de Tiempo.

## Quién es el autor

Juan Pablo Sánchez, cofundador y CIO de una fintech mexicana de ahorro (Bombo) y estudiante de Ingeniería Financiera. Este sitio es su **canal personal de ensayos**: economía, política, inversión y vida económica. Su audiencia son founders y CEOs, no financieros. Escribe en español de México, tutea al lector, y su regla dura es **NUNCA usar em dashes (—)**.

## Regla que NO puedes romper

**Tú no escribes los ensayos.** Juan Pablo escribe el primer borrador de cada artículo, sin IA. Tú construyes el andamiaje. Deja un artículo de ejemplo con texto de relleno marcado como `PLACEHOLDER` y, para el primer artículo real ("Por qué existe esta página"), solo el esqueleto de secciones vacías con comentarios en el JSON, nunca prosa redactada.

## Requisitos técnicos

- **Estático puro**: HTML, CSS y JSON. Sin frameworks, sin paso de build, sin dependencias externas ni CDNs. Tiene que abrirse con doble clic y funcionar igual en GitHub Pages.
- **Estructura sugerida**: `index.html` (portada con la lista de artículos), `articulo.html` (plantilla que lee `?slug=` y renderiza desde el JSON), `css/estilos.css`, `js/app.js`, `datos/articulos.json`, `robots.txt`, `sitemap.xml`, `.nojekyll`, `rss.xml`, `llms.txt`, `404.html`.
- **`articulos.json`** por artículo: `slug`, `titulo`, `resumen`, `fecha`, `fechaActualizacion`, `etiquetas`, `autor`, `enCorto` (arreglo de 3 a 5 puntos) y `cuerpo` (arreglo de párrafos, con soporte mínimo para subtítulos y listas).
- **Publicación**: GitHub Pages bajo la cuenta `QuantRabbit`. Deja en el README los comandos exactos para crear el repo (sugerido `QuantRabbit.github.io`) y publicar, pero **no hagas push ni crees el repositorio** sin que él lo apruebe.

## SEO (buscadores)

HTML semántico (`article`, `header`, `nav`, `time`), `title` y `meta description` por artículo, `link rel=canonical`, Open Graph y Twitter card, JSON-LD de `Article` y `Person`, `sitemap.xml`, `robots.txt`, slugs descriptivos en español, un solo `h1` por página, `alt` en imágenes, y carga rápida sin JavaScript bloqueante.

## GEO (que las IA lo citen)

Tan importante como el SEO:

- Cada artículo abre con un bloque **"En corto"** de 3 a 5 puntos, en frases cortas y autosuficientes (que se entiendan sin el resto del texto).
- Cifras con unidad, año y fuente explícitos en la misma oración.
- Sección de **preguntas frecuentes** con marcado `FAQPage`.
- Fecha de publicación y de actualización visibles en la página y en el JSON-LD.
- Autoría con bio y credenciales en la página de autor.
- Enlaces a fuentes primarias dentro del texto.
- Un archivo **`llms.txt`** en la raíz que describa el sitio, al autor y la lista de artículos con sus URLs y resúmenes.
- URLs estables y legibles, y frases que se puedan citar solas: una idea por oración, sin pronombres colgados ni referencias a "como dije arriba".

## Diseño

Sobrio y tipográfico. Fondo claro, una sola columna, ancho de lectura de 65 a 75 caracteres, tipografía del sistema, jerarquía clara con buen espaciado, modo oscuro automático con `prefers-color-scheme`. Sin animaciones llamativas, sin fotos de stock, sin iconos decorativos.

## Entregable

El sitio funcionando que se pueda abrir localmente, con un artículo de ejemplo y el README con las instrucciones de publicación. Al terminar, responde en una línea: qué falta y qué asumiste.
