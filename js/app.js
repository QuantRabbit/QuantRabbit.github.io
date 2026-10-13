/**
 * Logica de renderizado para el sitio personal de ensayos de Juan Pablo Sanchez
 * Sin dependencias ni frameworks. Compatible con doble clic (file://) y GitHub Pages.
 */

// Utilidad para obtener la lista de articulos con respaldo sincronico
async function obtenerArticulos() {
  if (window.location.protocol !== 'file:') {
    try {
      const respuesta = await fetch('datos/articulos.json');
      if (respuesta.ok) {
        return await respuesta.json();
      }
    } catch (e) {
      // Fallback si la peticion fetch falla
    }
  }
  return window.ARTICULOS_DATA || [];
}

// Formateador de fechas para espanol de Mexico
function formatearFecha(cadenaFecha) {
  if (!cadenaFecha) return '';
  const partes = cadenaFecha.split('-');
  if (partes.length !== 3) return cadenaFecha;
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const dia = parseInt(partes[2], 10);
  const mes = meses[parseInt(partes[1], 10) - 1];
  const ano = partes[0];
  return `${dia} de ${mes} de ${ano}`;
}

// Escape simple para prevenir inyecciones no deseadas
function escaparHTML(texto) {
  if (!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Insercion de JSON-LD dinamico para SEO y motores de IA (GEO)
function inyectarMetadatosJSONLD(articulo) {
  const scriptExistente = document.getElementById('jsonld-dinamico');
  if (scriptExistente) {
    scriptExistente.remove();
  }

  const script = document.createElement('script');
  script.id = 'jsonld-dinamico';
  script.type = 'application/ld+json';

  const datosGraph = [
    {
      "@type": "Article",
      "@id": `https://quantrabbit.github.io/articulo.html?slug=${articulo.slug}#articulo`,
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://quantrabbit.github.io/#sitio",
        "name": "Juan Pablo Sánchez - Ensayos",
        "url": "https://quantrabbit.github.io/"
      },
      "headline": articulo.titulo,
      "description": articulo.resumen,
      "datePublished": articulo.fecha,
      "dateModified": articulo.fechaActualizacion || articulo.fecha,
      "mainEntityOfPage": `https://quantrabbit.github.io/articulo.html?slug=${articulo.slug}`,
      "inLanguage": "es-MX",
      "author": {
        "@type": "Person",
        "@id": "https://quantrabbit.github.io/sobre-mi.html#autor",
        "name": "Juan Pablo Sánchez",
        "jobTitle": "Cofundador y CIO",
        "worksFor": {
          "@type": "Organization",
          "name": "Bombo"
        },
        "url": "https://quantrabbit.github.io/sobre-mi.html"
      },
      "publisher": {
        "@type": "Person",
        "name": "Juan Pablo Sánchez"
      }
    }
  ];

  if (articulo.faq && articulo.faq.length > 0) {
    const faqEntidades = articulo.faq
      .filter(item => item.pregunta && (item.respuesta || item._comentario))
      .map(item => ({
        "@type": "Question",
        "name": item.pregunta,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.respuesta || item._comentario
        }
      }));

    if (faqEntidades.length > 0) {
      datosGraph.push({
        "@type": "FAQPage",
        "@id": `https://quantrabbit.github.io/articulo.html?slug=${articulo.slug}#faq`,
        "mainEntity": faqEntidades
      });
    }
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": datosGraph
  }, null, 2);

  document.head.appendChild(script);
}

// Actualizacion de etiquetas meta del encabezado
function actualizarMetasEncabezado(articulo) {
  document.title = `${articulo.titulo} | Juan Pablo Sánchez`;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = articulo.resumen || '';

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `https://quantrabbit.github.io/articulo.html?slug=${articulo.slug}`;

  // Open Graph
  function fijarMeta(propiedad, contenido) {
    let el = document.querySelector(`meta[property="${propiedad}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', propiedad);
      document.head.appendChild(el);
    }
    el.content = contenido;
  }

  fijarMeta('og:title', articulo.titulo);
  fijarMeta('og:description', articulo.resumen || '');
  fijarMeta('og:type', 'article');
  fijarMeta('og:url', `https://quantrabbit.github.io/articulo.html?slug=${articulo.slug}`);

  // Twitter Card
  function fijarTwitter(nombre, contenido) {
    let el = document.querySelector(`meta[name="${nombre}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', nombre);
      document.head.appendChild(el);
    }
    el.content = contenido;
  }

  fijarTwitter('twitter:card', 'summary');
  fijarTwitter('twitter:title', articulo.titulo);
  fijarTwitter('twitter:description', articulo.resumen || '');
}

// Renderizado de portada (index.html)
async function inicializarPortada() {
  const contenedor = document.getElementById('contenedor-articulos');
  if (!contenedor) return;

  const articulos = await obtenerArticulos();
  if (articulos.length === 0) {
    contenedor.innerHTML = '<p>No hay ensayos disponibles por el momento.</p>';
    return;
  }

  let html = '<ul class="lista-articulos">';
  articulos.forEach(art => {
    const fechaTexto = formatearFecha(art.fecha);
    const etiquetasHtml = (art.etiquetas || [])
      .map(t => `<span class="etiqueta">${escaparHTML(t)}</span>`)
      .join(' ');

    html += `
      <li class="item-articulo">
        <time class="item-articulo-fecha" datetime="${escaparHTML(art.fecha)}">${escaparHTML(fechaTexto)}</time>
        <h2 class="item-articulo-titulo">
          <a href="articulo.html?slug=${encodeURIComponent(art.slug)}">${escaparHTML(art.titulo)}</a>
        </h2>
        <p class="item-articulo-resumen">${escaparHTML(art.resumen)}</p>
        <div class="etiquetas">${etiquetasHtml}</div>
      </li>
    `;
  });
  html += '</ul>';

  contenedor.innerHTML = html;
}

// Renderizado de articulo individual (articulo.html)
async function inicializarArticulo() {
  const contenedor = document.getElementById('contenedor-articulo');
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const articulos = await obtenerArticulos();

  if (!slug) {
    let enlaces = articulos.map(a => `<li><a href="articulo.html?slug=${encodeURIComponent(a.slug)}">${escaparHTML(a.titulo)}</a></li>`).join('');
    contenedor.innerHTML = `
      <a href="index.html" class="enlace-volver">← Volver al inicio</a>
      <h1>Selecciona un ensayo</h1>
      <p>No se especificó ningún artículo en el enlace. Elige uno de la lista a continuación:</p>
      <ul>${enlaces}</ul>
    `;
    return;
  }

  const articulo = articulos.find(a => a.slug === slug);

  if (!articulo) {
    contenedor.innerHTML = `
      <a href="index.html" class="enlace-volver">← Volver al inicio</a>
      <h1>Ensayo no encontrado</h1>
      <p>El ensayo con el identificador <code>${escaparHTML(slug)}</code> no existe en el sistema.</p>
      <p><a href="index.html">Ir a la lista de todos los ensayos</a></p>
    `;
    return;
  }

  actualizarMetasEncabezado(articulo);
  inyectarMetadatosJSONLD(articulo);

  const fechaPub = formatearFecha(articulo.fecha);
  const fechaAct = formatearFecha(articulo.fechaActualizacion);
  const etiquetasHtml = (articulo.etiquetas || [])
    .map(t => `<span class="etiqueta">${escaparHTML(t)}</span>`)
    .join(' ');

  let html = `
    <a href="index.html" class="enlace-volver">← Todos los ensayos</a>
    <article>
      <header>
        <h1>${escaparHTML(articulo.titulo)}</h1>
        ${articulo.subtitulo ? `<p class="subtitulo-articulo">${escaparHTML(articulo.subtitulo)}</p>` : ''}
        <div class="articulo-meta">
          <span class="meta-autor">Por <a href="sobre-mi.html">${escaparHTML(articulo.autor ? articulo.autor.nombre : 'Juan Pablo Sánchez')}</a></span>
          <time datetime="${escaparHTML(articulo.fecha)}">Publicado el ${escaparHTML(fechaPub)}</time>
          ${articulo.fechaActualizacion && articulo.fechaActualizacion !== articulo.fecha ? `<time datetime="${escaparHTML(articulo.fechaActualizacion)}">(Actualizado el ${escaparHTML(fechaAct)})</time>` : ''}
        </div>
        <div class="etiquetas">${etiquetasHtml}</div>
      </header>
  `;

  // Bloque "En corto" para lectura rapida y motores de IA (GEO)
  if (articulo.enCorto && articulo.enCorto.length > 0) {
    html += `
      <section class="en-corto" aria-label="Resumen ejecutivo">
        <h2>En corto</h2>
        <ul>
    `;
    articulo.enCorto.forEach(punto => {
      html += `<li>${escaparHTML(punto)}</li>`;
    });
    html += `
        </ul>
      </section>
    `;
  }

  // Cuerpo del ensayo
  html += '<div class="cuerpo-articulo">';
  if (articulo.cuerpo && articulo.cuerpo.length > 0) {
    articulo.cuerpo.forEach(bloque => {
      if (bloque.tipo === 'subtitulo') {
        html += `<h2>${escaparHTML(bloque.texto)}</h2>`;
      } else if (bloque.tipo === 'parrafo') {
        if (bloque.texto && bloque.texto.trim().length > 0) {
          html += `<p>${escaparHTML(bloque.texto)}</p>`;
        } else if (bloque._comentario) {
          html += `
            <div class="borrador-box">
              <strong>Sección en borrador (redacción por Juan Pablo):</strong>
              ${escaparHTML(bloque._comentario)}
            </div>
          `;
        }
      } else if (bloque.tipo === 'lista' && Array.isArray(bloque.items)) {
        html += '<ul>';
        bloque.items.forEach(item => {
          html += `<li>${escaparHTML(item)}</li>`;
        });
        html += '</ul>';
      } else if (bloque.tipo === 'cita') {
        html += `
          <blockquote>
            <p>${escaparHTML(bloque.texto)}</p>
            ${bloque.fuente ? `<cite>${escaparHTML(bloque.fuente)}</cite>` : ''}
          </blockquote>
        `;
      }
    });
  }
  html += '</div>';

  // Seccion de preguntas frecuentes (FAQPage para GEO)
  if (articulo.faq && articulo.faq.length > 0) {
    html += `
      <section class="faq-seccion" aria-label="Preguntas frecuentes">
        <h2>Preguntas frecuentes</h2>
    `;
    articulo.faq.forEach(item => {
      html += `
        <div class="faq-item">
          <h3 class="faq-pregunta">${escaparHTML(item.pregunta)}</h3>
      `;
      if (item.respuesta && item.respuesta.trim().length > 0) {
        html += `<p class="faq-respuesta">${escaparHTML(item.respuesta)}</p>`;
      } else if (item._comentario) {
        html += `
          <div class="borrador-box">
            <strong>Respuesta pendiente (redacción por Juan Pablo):</strong>
            ${escaparHTML(item._comentario)}
          </div>
        `;
      }
      html += '</div>';
    });
    html += '</section>';
  }

  // Seccion de fuentes primarias
  if (articulo.fuentes && articulo.fuentes.length > 0) {
    html += `
      <section class="fuentes-seccion" aria-label="Fuentes y referencias">
        <h2>Fuentes primarias y referencias</h2>
        <ul class="fuentes-lista">
    `;
    articulo.fuentes.forEach(fuente => {
      html += `
        <li>
          <strong>${escaparHTML(fuente.nombre)}</strong>${fuente.ano ? ` (${escaparHTML(fuente.ano)})` : ''}: 
          <a href="${escaparHTML(fuente.url)}" target="_blank" rel="noopener noreferrer">${escaparHTML(fuente.descripcion || fuente.url)}</a>
        </li>
      `;
    });
    html += `
        </ul>
      </section>
    `;
  }

  // Modulo de autor al pie
  html += `
      <footer class="autor-box">
        <h3>Sobre el autor</h3>
        <p>
          <strong>Juan Pablo Sánchez</strong> es cofundador y CIO de Bombo (fintech mexicana de ahorro) y estudiante de Ingeniería Financiera. Escribe ensayos sobre economía, política, inversión y vida económica dirigidos a fundadores y directores generales.
        </p>
        <p>
          <a href="sobre-mi.html">Conocer más sobre Juan Pablo y el enfoque del sitio →</a>
        </p>
      </footer>
    </article>
    <div style="margin-top: 2.5rem;">
      <a href="index.html" class="enlace-volver">← Volver a la lista de todos los ensayos</a>
    </div>
  `;

  contenedor.innerHTML = html;
}

// Inicializacion al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('contenedor-articulos')) {
    inicializarPortada();
  } else if (document.getElementById('contenedor-articulo')) {
    inicializarArticulo();
  }
});
