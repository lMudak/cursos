const url = "https://docs.google.com/spreadsheets/d/1-QELABPEe-5NuQOtp2Z0ykgeNWBTY7nbcyvUnsaedIQ/gviz/tq?tqx=out:json";
let cursos = [], cursoSeleccionado = null;

fetch(url).then(res => res.text()).then(data => {
  const json = JSON.parse(data.substr(47).slice(0, -2));
  const rows = json.table.rows;
  cursos = rows.map(r => ({
    video_nombre: r.c[0]?.v,
    canal_id: r.c[1]?.v,
    clave: r.c[2]?.v,
    titulo: r.c[3]?.v,
    mostrar_chat: r.c[4]?.v?.toLowerCase() === "sí",
    activo: r.c[5]?.v?.toLowerCase() === "sí"
  })).filter(c => c.activo);

  const lista = document.getElementById("cursos-lista");
  cursos.forEach(curso => {
    const btn = document.createElement("button");
    btn.textContent = curso.video_nombre;
    btn.className = "md-button";
    btn.onclick = () => {
      cursoSeleccionado = curso;
      document.getElementById("acceso-curso").style.display = "block";
      document.getElementById("nombre-curso").textContent = curso.video_nombre;
      document.getElementById("contenido-curso").style.display = "none";
      document.getElementById("mensaje-error").textContent = "";
    };
    lista.appendChild(btn);
  });
});

function verificarClave() {
  const clave = document.getElementById("clave-ingresada").value;
  if (!cursoSeleccionado) return;
  if (clave === cursoSeleccionado.clave) mostrarContenido();
  else document.getElementById("mensaje-error").textContent = "❌ Contraseña incorrecta.";
}

function mostrarContenido() {
  const contenedor = document.getElementById("contenido-curso");
  const canal = cursoSeleccionado.canal_id;
  const mostrarChat = cursoSeleccionado.mostrar_chat;
  const titulo = cursoSeleccionado.titulo;
  let html = `<h3 style='font-weight:600;'>${titulo}</h3><div class='video-chat' style='display:flex; flex-wrap:wrap; gap:20px; justify-content:center;'>`;
  html += `<div style='flex:1 1 640px; min-width:300px;'><iframe width='100%' height='480' src='https://www.youtube.com/embed/live_stream?channel=${canal}' title='${titulo}' allowfullscreen allow='autoplay; encrypted-media;'></iframe></div>`;
  if (mostrarChat) {
    html += `<div style='flex:1 1 320px; min-width:300px;'><iframe width='100%' height='480' src='https://www.youtube.com/live_chat?channel=${canal}&embed_domain=hoho3d.com.ar' title='Chat en vivo'></iframe></div>`;
  }
  html += `</div>`;
  contenedor.innerHTML = html;
  contenedor.style.display = "block";
  document.getElementById("acceso-curso").style.display = "none";
}