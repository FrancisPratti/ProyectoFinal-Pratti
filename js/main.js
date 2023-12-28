const carasPermitidas = [0,4, 6, 8, 10, 12, 20];

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

function obtenerCarasValidas() {
  let caras = Number (prompt('Ingrese la cantidad de caras del dado (4, 6, 8, 10, 12 o 20) (o 0 para finalizar):', '6'));
  
  while (!carasPermitidas.includes(caras)) {
    caras = Number(prompt('Ingrese una cantidad válida de caras (4, 6, 8, 10, 12 o 20) (o 0 para finalizar):', '6'));
  }

  return caras;
}

let carasElegidas = obtenerCarasValidas();



while (carasElegidas != 0) {
  
  let numDados = parseInt(prompt('Ingrese el número de dados a tirar:', '1'));

  if (isNaN(numDados) || numDados <= 0) {
    alert('Ingrese un número válido mayor que cero.');
  } else {
    let resultados = SimuladorDados.tirarDados(numDados, carasElegidas);
    let suma = SimuladorDados.obtenerSuma();
    let resultadosTexto = `Resultados: ${resultados.join(', ')}\nSuma total: ${suma}`;
    alert(resultadosTexto);
  }

  carasElegidas = obtenerCarasValidas();
}


