# <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Roboto', sans-serif; background: #f7f7f7; color: #333; }
  .container { max-width: 960px; margin: auto; padding: 30px; text-align: center; }
  .titulo { font-weight: 700; margin-bottom: 20px; }
  .card {
    background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    padding: 30px; margin-top: 20px;
  }
  .md-button {
    background: #6200ee; color: #fff; border: none; padding: 12px 24px; margin: 5px;
    border-radius: 8px; font-weight: 500; cursor: pointer; transition: background 0.3s ease;
  }
  .md-button:hover { background: #4500b5; }
  .input-field {
    padding: 10px; width: 80%; max-width: 300px; border: 1px solid #ccc;
    border-radius: 6px; margin-bottom: 10px; font-size: 1em;
  }
  .error-text { color: #c62828; margin-top: 8px; }
  iframe { border-radius: 8px; border: none; }
  @media (max-width: 768px) { .video-chat { flex-direction: column; } }
</style>

<div class="container">
  <h2 class="titulo">🎓 Acceso a Cursos en Vivo - HoHo3D</h2>
  <div id="cursos-lista" style="margin:20px 0;"></div>

  <div id="acceso-curso" class="card" style="display:none;">
    <p>🔒 Ingresá la contraseña para acceder a <strong id="nombre-curso"></strong>:</p>
    <input type="password" id="clave-ingresada" class="input-field" placeholder="Contraseña">
    <br>
    <button onclick="verificarClave()" class="md-button">Acceder</button>
    <p id="mensaje-error" class="error-text"></p>
  </div>

  <div id="contenido-curso" class="card" style="display:none; margin-top:30px;"></div>
</div>

<script src="https://cdn.jsdelivr.net/gh/lMudak/cursos/hoho3d-cursos.js"></script>
