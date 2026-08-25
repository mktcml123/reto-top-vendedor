const URL_API = "https://script.google.com/macros/s/AKfycbwD7iJ_D9BtLSUh9xfv1QqSzrXx79qfs3Ncm5uH3zr8uZnsTB2vb0SHgzkbeqQ7oBgc/exec";

async function cargarRanking() {

  try {

    const respuesta = await fetch(URL_API);
    const datos = await respuesta.json();

    // =========================
    // PODIO
    // =========================

    let podio = "";

    datos.slice(0, 3).forEach((persona, index) => {

      const medallas = ["🥇", "🥈", "🥉"];

      podio += `
        <div class="tarjeta">

          <h2>${medallas[index]}</h2>

          <h3>${persona.colaborador}</h3>

          <p>${persona.ventas}</p>

          <span>ventas</span>

        </div>
      `;

    });

    document.getElementById("podio").innerHTML = podio;


    // =========================
    // TOP 10
    // =========================

    let tabla = "";

    datos.slice(0, 10).forEach((persona, index) => {

      tabla += `
        <tr>

          <td>${index + 1}</td>

          <td>${persona.colaborador}</td>

          <td>${persona.sucursal || "—"}</td>

          <td>${persona.ventas}</td>

        </tr>
      `;

    });

    document.getElementById("tablaRanking").innerHTML = tabla;


  } catch (error) {

    console.error("Error al cargar ranking:", error);

  }

}


// Cargar al abrir
cargarRanking();


// Actualizar cada minuto
setInterval(cargarRanking, 60000);
