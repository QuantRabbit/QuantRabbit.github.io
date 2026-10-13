/**
 * Logica de aplicacion para el sitio personal de ensayos de Juan Pablo Sanchez
 * Diseno editorial inspirado en GBM Media "The Idea" / WSJ
 * Sin dependencias externas ni CDNs. Compatible con file:// y GitHub Pages.
 */

// ==========================================================================
// Gestion de Tema (Claro / Oscuro) con persistencia
// ==========================================================================

function obtenerTemaActual() {
  const guardado = localStorage.getItem('tema-preferido');
  if (guardado) return guardado;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'oscuro';
  }
  return 'claro';
}

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-tema', tema);
  localStorage.setItem('tema-preferido', tema);
  actualizarBotonTema(tema);
}

function actualizarBotonTema(tema) {
  const botones = document.querySelectorAll('.btn-tema');
  botones.forEach(btn => {
    if (tema === 'oscuro') {
      btn.innerHTML = '<span>☀️</span><span>CLARO</span>';
      btn.setAttribute('aria-label', 'Cambiar a modo claro');
      btn.setAttribute('title', 'Cambiar a modo claro editorial');
    } else {
      btn.innerHTML = '<span>🌙</span><span>OSCURO</span>';
      btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      btn.setAttribute('title', 'Cambiar a modo oscuro terminal');
    }
  });
}

function inicializarManejadorTema() {
  const temaInicial = obtenerTemaActual();
  aplicarTema(temaInicial);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-tema');
    if (btn) {
      e.preventDefault();
      const actual = document.documentElement.getAttribute('data-tema') || obtenerTemaActual();
      const nuevo = (actual === 'oscuro') ? 'claro' : 'oscuro';
      aplicarTema(nuevo);
    }
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('tema-preferido')) {
        aplicarTema(e.matches ? 'oscuro' : 'claro');
      }
    });
  }
}

// Ejecutar inmediatamente para evitar parpadeos
inicializarManejadorTema();

// ==========================================================================
// Acceso a Datos de Articulos (Dual: fetch o window.ARTICULOS_DATA)
// ==========================================================================

async function obtenerArticulos() {
  if (window.location.protocol !== 'file:') {
    try {
      const respuesta = await fetch('datos/articulos.json');
      if (respuesta.ok) {
        return await respuesta.json();
      }
    } catch (e) {
      // Respaldo silencioso al script precargado
    }
  }
  return window.ARTICULOS_DATA || [];
}

// ==========================================================================
// Formateadores y utilidades de texto
// ==========================================================================

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

function formatearFechaCorta(cadenaFecha) {
  if (!cadenaFecha) return '';
  const partes = cadenaFecha.split('-');
  if (partes.length !== 3) return cadenaFecha;
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const dia = partes[2].padStart(2, '0');
  const mes = meses[parseInt(partes[1], 10) - 1];
  const ano = partes[0];
  return `${dia} ${mes} ${ano}`;
}

function calcularTiempoLectura(articulo) {
  let palabras = (articulo.titulo || '').split(/\s+/).length;
  if (articulo.subtitulo) palabras += articulo.subtitulo.split(/\s+/).length;
  if (articulo.resumen) palabras += articulo.resumen.split(/\s+/).length;
  if (articulo.enCorto) palabras += articulo.enCorto.join(' ').split(/\s+/).length;
  if (articulo.cuerpo) {
    articulo.cuerpo.forEach(b => {
      if (b.texto) palabras += b.texto.split(/\s+/).length;
      if (b.items) palabras += b.items.join(' ').split(/\s+/).length;
    });
  }
  const minutos = Math.max(1, Math.ceil(palabras / 180));
  return `${minutos} MIN DE LECTURA`;
}

function escaparHTML(texto) {
  if (!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ==========================================================================
// Insercion dinamica de JSON-LD (SEO y GEO)
// ==========================================================================

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

// ==========================================================================
// Renderizado de Portada (index.html) estilo GBM Media "The Idea"
// ==========================================================================

async function inicializarPortada() {
  const contenedor = document.getElementById('contenedor-articulos');
  if (!contenedor) return;

  const articulos = await obtenerArticulos();
  if (articulos.length === 0) {
    contenedor.innerHTML = '<p>No hay ensayos disponibles por el momento.</p>';
    return;
  }

  const destacado = articulos[0];
  const secundarios = articulos.slice(1);

  // 1. Tarjeta Destacada (archive__featured)
  const fechaDestacada = formatearFechaCorta(destacado.fecha);
  const tiempoDestacada = calcularTiempoLectura(destacado);
  const kickerDestacado = destacado.etiquetas && destacado.etiquetas[0] ? destacado.etiquetas[0].toUpperCase() : 'EDITORIAL';
  const etiquetasDestacadasHtml = (destacado.etiquetas || [])
    .map(t => `<span class="etiqueta">${escaparHTML(t)}</span>`)
    .join(' ');

  let html = `
    <!-- Bloque Destacado -->
    <section class="seccion-destacada" aria-label="Ensayo destacado">
      <a href="articulo.html?slug=${encodeURIComponent(destacado.slug)}" class="card-destacada">
        <div class="card-destacada__tags">
          <span class="tag-pill tag-pill--solid">NUEVO</span>
          <span class="seccion-kicker">${escaparHTML(kickerDestacado)}</span>
        </div>
        <h2 class="card-destacada__titulo">${escaparHTML(destacado.titulo)}</h2>
        <p class="card-destacada__resumen">${escaparHTML(destacado.resumen)}</p>
        <div class="meta-container">
          <span class="meta-fecha">${escaparHTML(fechaDestacada)}</span>
          <span class="meta-separador">·</span>
          <span class="meta-tiempo">${escaparHTML(tiempoDestacada)}</span>
          <span class="meta-separador">·</span>
          <span class="meta-autor">POR JUAN PABLO SÁNCHEZ</span>
        </div>
        <div class="etiquetas">${etiquetasDestacadasHtml}</div>
      </a>
    </section>
  `;

  // 2. Cuadricula de Ensayos Secundarios (archive__grid)
  if (secundarios.length > 0) {
    html += `
      <section class="seccion-grid" aria-label="Más ensayos publicados">
        <h2 class="seccion-grid__titulo-bloque">Más publicaciones</h2>
        <div class="grid-articulos">
    `;

    secundarios.forEach(art => {
      const fechaCorta = formatearFechaCorta(art.fecha);
      const tiempo = calcularTiempoLectura(art);
      const kicker = art.etiquetas && art.etiquetas[0] ? art.etiquetas[0].toUpperCase() : 'THE IDEA';
      const tagsHtml = (art.etiquetas || [])
        .map(t => `<span class="etiqueta">${escaparHTML(t)}</span>`)
        .join(' ');

      html += `
        <a href="articulo.html?slug=${encodeURIComponent(art.slug)}" class="card-articulo">
          <div class="card-articulo__top">
            <div class="card-articulo__kicker">
              <span class="seccion-kicker">${escaparHTML(kicker)}</span>
            </div>
            <h3 class="card-articulo__titulo">${escaparHTML(art.titulo)}</h3>
            <p class="card-articulo__resumen">${escaparHTML(art.resumen)}</p>
          </div>
          <div class="card-articulo__bottom">
            <div class="meta-container">
              <span class="meta-fecha">${escaparHTML(fechaCorta)}</span>
              <span class="meta-separador">·</span>
              <span class="meta-tiempo">${escaparHTML(tiempo)}</span>
            </div>
            <div class="etiquetas">${tagsHtml}</div>
          </div>
        </a>
      `;
    });

    html += `
        </div>
      </section>
    `;
  }

  contenedor.innerHTML = html;
}

// ==========================================================================
// Renderizado de Articulo Individual (articulo.html) estilo GBM The Idea
// ==========================================================================

async function inicializarArticulo() {
  const contenedor = document.getElementById('contenedor-articulo');
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const articulos = await obtenerArticulos();

  if (!slug) {
    let enlaces = articulos.map(a => `<li><a href="articulo.html?slug=${encodeURIComponent(a.slug)}">${escaparHTML(a.titulo)}</a></li>`).join('');
    contenedor.innerHTML = `
      <div class="columna-lectura" style="padding: 3rem 0;">
        <a href="index.html" class="btn-retorno">← Regresar a Ensayos</a>
        <h1 class="single-hero__titulo">Selecciona un ensayo</h1>
        <p>No se especificó ningún artículo en el enlace. Elige uno de la lista a continuación:</p>
        <ul style="margin: 1.5rem 0; padding-left: 1.5rem;">${enlaces}</ul>
      </div>
    `;
    return;
  }

  const articulo = articulos.find(a => a.slug === slug);

  if (!articulo) {
    contenedor.innerHTML = `
      <div class="columna-lectura" style="padding: 3rem 0;">
        <a href="index.html" class="btn-retorno">← Regresar a Ensayos</a>
        <h1 class="single-hero__titulo">Ensayo no encontrado</h1>
        <p>El ensayo con el identificador <code>${escaparHTML(slug)}</code> no existe en el sistema.</p>
        <p><a href="index.html">Ir a la lista de todos los ensayos</a></p>
      </div>
    `;
    return;
  }

  actualizarMetasEncabezado(articulo);
  inyectarMetadatosJSONLD(articulo);

  const fechaCorta = formatearFechaCorta(articulo.fecha);
  const tiempoLectura = calcularTiempoLectura(articulo);
  const categoria = articulo.etiquetas && articulo.etiquetas[0] ? articulo.etiquetas[0].toUpperCase() : 'THE IDEA';
  const urlActual = window.location.href;
  const textoCompartir = encodeURIComponent(`${articulo.titulo} | Juan Pablo Sánchez: `);

  let html = `
    <div class="columna-lectura">
      <header class="single-hero">
        <a href="index.html" class="btn-retorno">← Regresar a Ensayos</a>
        <div class="single-hero__tags">
          <span class="tag-pill tag-pill--outline">EDITORIAL</span>
          <span class="seccion-kicker">${escaparHTML(categoria)}</span>
        </div>
        <h1 class="single-hero__titulo">${escaparHTML(articulo.titulo)}</h1>
        ${articulo.subtitulo ? `<p class="single-hero__bajada">${escaparHTML(articulo.subtitulo)}</p>` : ''}
        <div class="meta-container single-hero__meta">
          <span class="meta-fecha"><time datetime="${escaparHTML(articulo.fecha)}">${escaparHTML(fechaCorta)}</time></span>
          <span class="meta-separador">·</span>
          <span class="meta-tiempo">${escaparHTML(tiempoLectura)}</span>
          <span class="meta-separador">·</span>
          <span class="meta-autor">POR <a href="sobre-mi.html" style="color: inherit; text-decoration: underline;">${escaparHTML(articulo.autor ? articulo.autor.nombre : 'Juan Pablo Sánchez')}</a></span>
          <span class="meta-separador">·</span>
          <span class="meta-badge">TEXTO SIN IA</span>
          ${articulo.fechaActualizacion && articulo.fechaActualizacion !== articulo.fecha ? `<span class="meta-separador">·</span><span>ACTUALIZADO: ${escaparHTML(formatearFechaCorta(articulo.fechaActualizacion))}</span>` : ''}
        </div>
      </header>

      <!-- Barra para compartir -->
      <div class="single-share">
        <span class="single-share__label">Compartir:</span>
        <a href="https://wa.me/?text=${textoCompartir}${encodeURIComponent(urlActual)}" target="_blank" rel="noopener noreferrer" class="btn-share">WhatsApp</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlActual)}" target="_blank" rel="noopener noreferrer" class="btn-share">LinkedIn</a>
        <a href="https://twitter.com/intent/tweet?text=${textoCompartir}&url=${encodeURIComponent(urlActual)}" target="_blank" rel="noopener noreferrer" class="btn-share">X</a>
        <button type="button" class="btn-share" id="btn-copiar-enlace" onclick="navigator.clipboard.writeText(window.location.href); this.textContent='¡Copiado!'; setTimeout(() => this.textContent='Copiar enlace', 2000);">Copiar enlace</button>
      </div>
  `;

  // Bloque "En corto" para lectura rapida y motores de IA (GEO)
  if (articulo.enCorto && articulo.enCorto.length > 0) {
    html += `
      <section class="en-corto" aria-label="Resumen ejecutivo">
        <div class="en-corto__header">
          <span style="font-size: 1.1rem;">⚡</span>
          <span class="en-corto__kicker">EN CORTO: SÍNTESIS EJECUTIVA</span>
        </div>
        <p class="en-corto__intro">Puntos clave autosuficientes para directores generales y referencia directa en motores de respuesta (GEO):</p>
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
        <h2 class="faq-seccion__titulo">Preguntas frecuentes</h2>
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

  // Tarjeta de autor al pie
  html += `
      <div class="autor-card">
        <div class="autor-card__monograma">JP</div>
        <div class="autor-card__body">
          <h3>Juan Pablo Sánchez</h3>
          <p class="autor-card__cargo">Cofundador y CIO de Bombo · Estudiante de Ingeniería Financiera</p>
          <p class="autor-card__bio">
            Escribe ensayos sobre macroeconomía, decisiones de tesorería, regulación fintech e inversión estratégica dirigidos a directores generales y fundadores. Redacta todos sus textos personalmente sin asistencia de inteligencia artificial.
          </p>
          <a href="sobre-mi.html" class="autor-card__enlace">Leer más sobre Juan Pablo y los principios de este sitio →</a>
        </div>
      </div>

      <div style="margin: 3rem 0 1rem 0;">
        <a href="index.html" class="btn-retorno">← Regresar a la lista de todos los ensayos</a>
      </div>
    </div>
  `;

  contenedor.innerHTML = html;
}

// ==========================================================================
// Inicializacion al cargar el DOM
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  actualizarBotonTema(obtenerTemaActual());

  if (document.getElementById('contenedor-articulos')) {
    inicializarPortada();
  } else if (document.getElementById('contenedor-articulo')) {
    inicializarArticulo();
  }
});
