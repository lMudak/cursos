let cursos = [];
let cursoSeleccionado = null;

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQELABPEe-5NuQOtp2Z0ykgeNWBTY7nbcyvUnsaedIQ/pub?output=tsv";

fetch(url)
  .then(res => res.text())
  .then(data => {
    const rows = data.trim().split("\n").slice(1).map(row => row.split("\t"));
    cursos = rows.map(r => ({
      video_nombre: r[0],
      canal_id: r[1],
      clave: r[2],
      titulo: r[3],
      mostrar_chat: r[4].toLowerCase(),
      activo: r[5].toLowerCase()
    })).filter(r => r.activo === "sí");

    const lista = document.getElementById("cursos-lista");
    cursos.forEach(curso => {
      const btn = document.createElement("button");
      btn.textContent = curso.video_nombre;
      btn.onclick = () => {
        cursoSeleccionado = curso;
        document.getElementById("acceso-curso").style.display = "block";
        document.getElementById("contenido-curso").style.display = "none";
        document.getElementById("mensaje-error").textContent = "";
      };
      lista.appendChild(btn);
    });
  });

function verificarClave() {
  const clave = document.getElementById("clave-ingresada").value;
  if (!cursoSeleccionado) return;
  if (clave === cursoSeleccionado.clave) {
    mostrarContenido();
  } else {
    document.getElementById("mensaje-error").textContent = "❌ Clave incorrecta.";
  }
}

function mostrarContenido() {
  const canal = cursoSeleccionado.canal_id;
  const titulo = cursoSeleccionado.titulo;
  const mostrarChat = cursoSeleccionado.mostrar_chat === "sí";

  let html = `<h2>\${titulo}</h2><div id="video-chat">`;
  html += `<div><iframe width="100%" height="480" src="https://www.youtube.com/embed/\${canal}?autoplay=1"
           allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
  if (mostrarChat) {
    html += `<div><iframe width="100%" height="480" src="https://www.youtube.com/live_chat?v=\${canal}&embed_domain=hoho3d.com.ar"></iframe></div>`;
  }
  html += `</div>`;

  document.getElementById("contenido-curso").innerHTML = html;
  document.getElementById("contenido-curso").style.display = "block";
  document.getElementById("acceso-curso").style.display = "none";
}