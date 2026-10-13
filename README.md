# Juan Pablo Sánchez: Sitio personal de ensayos

Canal personal de ensayos sobre economía, política, inversión y vida económica escrito por Juan Pablo Sánchez para founders y directores generales.

El sitio es estático puro (HTML5, CSS y JSON), sin dependencias externas, sin librerías de terceros y sin paso de compilación. Funciona abriendo directamente los archivos con doble clic en el explorador de archivos local y se publica de forma directa en GitHub Pages.

---

## 1. Estructura del proyecto

```text
sitio-personal/
├── index.html              # Portada con la lista cronológica de ensayos
├── articulo.html           # Plantilla dinámica de lectura (lee ?slug=)
├── sobre-mi.html           # Página de autor con biografía, credenciales y marcado Person
├── 404.html                # Página de error 404
├── .nojekyll               # Desactiva el procesamiento de Jekyll en GitHub Pages
├── robots.txt              # Reglas para rastreadores y enlace al sitemap
├── sitemap.xml             # Mapa XML del sitio para indexación
├── rss.xml                 # Feed de suscripción en formato RSS 2.0
├── llms.txt                # Índice y contexto optimizado para motores de IA (GEO)
├── DESIGN.md               # Sistema de diseño editorial inspirado en Claude (VoltAgent/awesome-design-md)
├── css/
│   └── estilos.css         # Tipografía sobria, una columna (68ch) y modo oscuro automático
├── js/
│   └── app.js              # Carga de datos, inyección de metadatos y marcado JSON-LD
└── datos/
    ├── articulos.json      # Fuente de verdad de los ensayos en formato JSON
    └── articulos.js        # Respaldo sincronizado para apertura local directa (file://)
```

---

## 2. Cómo probar el sitio en local

Puedes utilizar cualquiera de las siguientes dos opciones:

### Opción A: Doble clic directo (sin terminal)
Haz doble clic sobre `index.html` o arrástralo a tu navegador (Safari, Chrome o Firefox). El sitio incluye soporte directo mediante `datos/articulos.js` para visualizarse sin restricciones de CORS locales.

### Opción B: Servidor HTTP local
Si prefieres servirlo mediante un servidor HTTP local en tu máquina:

```bash
python3 -m http.server 8000
```

Luego abre en tu navegador:
```text
http://localhost:8000/
```

---

## 3. Instrucciones de publicación en GitHub Pages (Cuenta: QuantRabbit)

Para publicar el sitio en GitHub Pages bajo tu cuenta `QuantRabbit`, sigue estos pasos desde la terminal dentro de esta carpeta (`/Users/juanpablo/Desktop/sitio-personal`).

> Nota: Los siguientes comandos NO han sido ejecutados por el agente. Requieren tu ejecución manual.

### Método 1: Usando GitHub CLI (`gh`)

```bash
# 1. Asegúrate de tener los cambios listos en el commit inicial
git add .
git commit -m "Andamiaje inicial del sitio de ensayos con soporte SEO y GEO"

# 2. Crea el repositorio público en tu cuenta QuantRabbit (usando el nombre de Pages de usuario)
gh repo create QuantRabbit/QuantRabbit.github.io --public --source=. --remote=origin --push
```

Una vez creado y subido:
1. Ve a `https://github.com/QuantRabbit/QuantRabbit.github.io/settings/pages`.
2. En **Build and deployment > Source**, confirma que esté seleccionado **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)`.
4. Haz clic en **Save**. En 1 a 2 minutos, tu sitio estará en vivo en `https://quantrabbit.github.io/`.

### Método 2: Usando Git estándar

```bash
# 1. Haz el primer commit local
git add .
git commit -m "Andamiaje inicial del sitio de ensayos con soporte SEO y GEO"

# 2. Crea manualmente el repositorio en https://github.com/new con el nombre QuantRabbit.github.io

# 3. Conecta el repositorio remoto (usando SSH o HTTPS según tu configuración)
# Vía SSH:
git remote add origin git@github.com:QuantRabbit/QuantRabbit.github.io.git
# O vía HTTPS:
# git remote add origin https://github.com/QuantRabbit/QuantRabbit.github.io.git

# 4. Sube la rama principal
git branch -M main
git push -u origin main
```

---

## 4. Cómo agregar o editar ensayos

La regla central del sitio es que **los ensayos se redactan a mano por Juan Pablo Sánchez, sin asistencia de inteligencia artificial**, manteniendo citas directas a fuentes primarias y sin utilizar guiones largos (em dashes).

Para escribir o editar un ensayo:

1. Abre `datos/articulos.json`.
2. Cada ensayo cuenta con los siguientes campos:
   - `slug`: Identificador único en minúsculas y con guiones (ej. `por-que-existe-esta-pagina`).
   - `titulo`: Titular del artículo.
   - `subtitulo`: Bajada explicativa.
   - `resumen`: Síntesis de 1 a 2 oraciones para meta descripción y buscadores.
   - `fecha`: Fecha de publicación en formato `AAAA-MM-DD`.
   - `fechaActualizacion`: Fecha de última edición en formato `AAAA-MM-DD`.
   - `etiquetas`: Arreglo de temas clave (ej. `["economía", "política"]`).
   - `autor`: Objeto con nombre, cargo y enlace.
   - `enCorto`: Arreglo de 3 a 5 puntos ejecutivos. Cada frase debe ser autosuficiente e incluir cifra con unidad, año y fuente explícita.
   - `cuerpo`: Arreglo ordenado de bloques tipográficos:
     - Subtítulo: `{"tipo": "subtitulo", "texto": "Nombre de la sección"}`
     - Párrafo: `{"tipo": "parrafo", "texto": "Tu texto redactado..."}`
     - Lista: `{"tipo": "lista", "items": ["Punto 1", "Punto 2"]}`
     - Cita: `{"tipo": "cita", "texto": "Cita textual", "fuente": "Fuente"}`
   - `faq`: Arreglo de preguntas y respuestas para marcado `FAQPage`.
   - `fuentes`: Arreglo de fuentes primarias consultadas con enlace.
3. Copia el mismo contenido del arreglo en `datos/articulos.js` bajo `window.ARTICULOS_DATA = [...]` para mantener la compatibilidad con doble clic local.
4. Actualiza `sitemap.xml`, `rss.xml` y `llms.txt` con la nueva URL del artículo.

---

## 5. Arquitectura de optimización para SEO y GEO

El sitio está estructurado para que tanto buscadores convencionales como modelos de lenguaje (ChatGPT, Claude, Perplexity, Gemini) puedan indexar, comprender y citar con precisión los ensayos:

- **Bloque "En corto":** Síntesis de 3 a 5 conclusiones autosuficientes al inicio del artículo. Permite a las IA extraer citas directas con contexto completo.
- **Datos con año y fuente:** Cada cifra vincula magnitud, temporalidad e institución emisora en la misma oración.
- **Sección FAQ con FAQPage:** Marcado JSON-LD `FAQPage` integrado para respuestas directas.
- **Esquema Person y Article:** Marcado semántico que atribuye la autoría profesional a Juan Pablo Sánchez (CIO de Bombo) y establece fechas de publicación y actualización.
- **Archivo llms.txt:** Documento en la raíz del dominio que orienta a los modelos de lenguaje sobre la especialidad del sitio, el autor y los ensayos publicados.
