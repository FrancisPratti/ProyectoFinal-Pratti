document.addEventListener('DOMContentLoaded', function() {
  // Obtén el valor del nombre almacenado en el localStorage
  const nombreGuardado = localStorage.getItem('nombre');

  // Si hay un nombre guardado, actualiza el campo de entrada con ese valor
  if (nombreGuardado) {
      document.getElementById('nombre').value = nombreGuardado;
  }
});

const guardar = document.getElementById ("guardar");
const nombreInput = document.getElementById ("nombre")

//Permite reemplazar el nombre guardado
guardar.addEventListener("click", function() {
  const nombre = nombreInput.value;
  localStorage.setItem('nombre', nombre);
});

let cantidadDados;
let carasDado;

// Creación de tarjetas de Dados
const contenedorDados = document.querySelector("#contenedor-dados");

fetch ("./js/dados.json")
    .then(response => response.json())
    .then (arrayDados => { 
      arrayDados.forEach(dado => {
  const div = document.createElement("div");
  div.classList.add("dado");
  div.innerHTML = `
    <img src="${dado.imagen}" class="card-img-top img-dado" alt="...">
    <div class="card-body">
      <h5 class="card-title">${dado.titulo}</h5>
      <h6>Cantidad de dados</h6>
      <input type="number" min="1" max="10" class="cantidad" id="${dado.input}" value="1">
      <button type="button" class="btn btn-primary" id="liveToastBtn${dado.id}">Tirar dados</button>
    </div>
  `;
  contenedorDados.appendChild(div);
});
// Funcionalidad del botón
const botonRoll = contenedorDados.querySelectorAll(".btn");

botonRoll.forEach(boton => {
  boton.addEventListener("click", () => {
    const dadoSeleccionado = arrayDados.find(dado => dado.id === parseInt(boton.id.replace("liveToastBtn", "")));
    cantidadDados = document.getElementById(dadoSeleccionado.input).value;
    carasDado = parseInt(boton.id.replace("liveToastBtn", ""));

    // Llamada a la función tirarDados
    const resultados = SimuladorDados.tirarDados(cantidadDados, carasDado);
    const suma = SimuladorDados.obtenerSuma();
    const resultadosTexto = `Resultados: ${resultados.join(', ')}\nSuma total: ${suma}`;
    console.log(resultadosTexto);

    // Toast para mostrar el resultado obtenido
    Toastify({
      text: `${nombre.value} tiró: ${resultados.join(', ')}\nTotal: ${suma}`,
      duration: 7000,
      close: true,
      newWindow: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #0e794a, #96c93d)",
      },
    }).showToast();

    // Guardar resultados después de interactuar con los dados
    guardarResultadosEnLocalStorage();
  });
});
})

// Función para tirar dados
const SimuladorDados = {
  resultados: [],
  suma: 0,

  tirarDado(caras) {
    return Math.floor(Math.random() * caras) + 1;
  },

  tirarDados(numDados, caras) {
    this.resultados = [];
    this.suma = 0;

    for (let i = 0; i < numDados; i++) {
      let resultadoDado = this.tirarDado(caras);
      this.resultados.push(resultadoDado);
      this.suma += resultadoDado;
    }

    guardarResultadosEnLocalStorage();

    return this.resultados;
  },

  obtenerResultados() {
    return this.resultados;
  },

  obtenerSuma() {
    return this.suma;
  }
};

// Recuperar resultados al cargar la página
const resultadosGuardados = localStorage.getItem('resultados');
if (resultadosGuardados) {
  const resultadosParseados = JSON.parse(resultadosGuardados);
  SimuladorDados.resultados = resultadosParseados.resultados || [];
  SimuladorDados.suma = resultadosParseados.suma || 0;
}

// Función para guardar resultados en localStorage
function guardarResultadosEnLocalStorage() {
  // Guarda los resultados actuales en localStorage
  const resultadosAGuardar = { resultados: SimuladorDados.resultados, suma: SimuladorDados.suma };
  localStorage.setItem('resultados', JSON.stringify(resultadosAGuardar));
}
