const arrayDados = [
  {
    id: 4,
    titulo: "Dado de 4 caras",
    imagen: "./img/d4.png",
    input: "d4",
  },
  {
    id: 6,
    titulo: "Dado de 6 caras",
    imagen: "./img/d6.png",
    input: "d6",
  },
  {
    id: 8,
    titulo: "Dado de 8 caras",
    imagen: "./img/d8.png",
    input: "d8",
  },
  {
    id: 10,
    titulo: "Dado de 10 caras",
    imagen: "./img/d10.png",
    input: "d10",
  },
  {
    id: 12,
    titulo: "Dado de 12 caras",
    imagen: "./img/d12.png",
    input: "d12",
  },
  {
    id: 20,
    titulo: "Dado de 20 caras",
    imagen: "./img/d20.png",
    input: "d20",
  }
];

// Definición de variables globales
// Definición de variables globales
let cantidadDados;
let carasDado;

// Creacion de tarjetas de Dados
const contenedorDados = document.querySelector("#contenedor-dados")

function tiposDeDados() {
    arrayDados.forEach(dado => {
      const div = document.createElement("div")
      div.classList.add("dado");
      div.innerHTML = `
        <img src="${dado.imagen}" class="card-img-top img-dado" alt="...">
        <div class="card-body">
          <h5 class="card-title">${dado.titulo}</h5>
          <h6>Cantidad de dados</h6>
          <input type="number" min="1" max="10" class="cantidad" id="${dado.input}">
          <button type="button" class="btn btn-primary" id="liveToastBtn${dado.id}">Tirar dados</button>
        </div>
      `;
      contenedorDados.appendChild(div);

      const botonRoll = contenedorDados.querySelectorAll(".btn")

      botonRoll.forEach(boton => {
        boton.addEventListener("click", () => {
          const dadoSeleccionado = arrayDados.find(dado => dado.id === parseInt(boton.id.replace("liveToastBtn", "")));
          cantidadDados = document.getElementById(dadoSeleccionado.input.value);
          carasDado = parseInt(boton.id.replace("liveToastBtn", ""));
          // Llamada a la función tirarDados solo una vez
          const resultados = SimuladorDados.tirarDados(cantidadDados, carasDado);
          const suma = SimuladorDados.obtenerSuma();
          const resultadosTexto = `Resultados: ${resultados.join(', ')}\nSuma total: ${suma}`;
          console.log(resultadosTexto);

                // Mostrar los resultados en el Toast de Bootstrap
                const resultadosShow = document.getElementById("resultados");
                resultadosShow.innerHTML = `
                    <div class="toast-container position-fixed bottom-0 end-0 p-3">
                        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <img src="..." class="rounded me-2" alt="...">
                                <strong class="me-auto">Tu resultado:</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                ${resultados.join(', ')}<br>Suma total: ${suma}
                            </div>
                        </div>
                    </div>
                `;
            })
        });
    });
}

// Llamada a la función
tiposDeDados();



//Fin creacion tarjetas de Dados

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

    return this.resultados;
  },

  obtenerResultados() {
    return this.resultados;
  },

  obtenerSuma() {
    return this.suma;
  }
};


let resultados = SimuladorDados.tirarDados(cantidadDados, carasDado);
let suma = SimuladorDados.obtenerSuma();
let resultadosTexto = `Resultados: ${resultados.join(', ')}\nSuma total: ${suma}`;
console.log(resultadosTexto);
  



