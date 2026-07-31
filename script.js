const URL_API = "https://script.google.com/macros/s/AKfycbwD7iJ_D9BtLSUh9xfv1QqSzrXx79qfs3Ncm5uH3zr8uZnsTB2vb0SHgzkbeqQ7oBgc/exec";

async function cargarRanking(){

    try{

        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();

        // PODIO
        let podio = "";

        datos.slice(0,3).forEach((persona,index)=>{

            const medallas = ["🥇","🥈","🥉"];

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

        // TABLA

        let tabla = "";

        datos.forEach(persona=>{

            tabla += `
                <tr>
                    <td>${persona.posicion}</td>
                    <td>${persona.colaborador}</td>
                    <td>${persona.ventas}</td>
                </tr>
            `;

        });

        document.getElementById("ranking").innerHTML = tabla;

    }catch(error){

        console.error(error);

    }

}

cargarRanking();

setInterval(cargarRanking,60000);
