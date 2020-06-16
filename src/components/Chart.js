import React, { useState, useEffect } from 'react';

import { Slider, TextField, Drawer } from '@material-ui/core';

import { Chart } from 'react-google-charts';

//FUNCAO DE CALCULO DO INVESTIMENTO
function calculo(investimento) {
  let mes = 1;
  let arrayResultado = [];
  while (mes <= 12) {
    const taxa = 2.5;
    let rendimento = (taxa / 30) * investimento;
    let valorAtualizado = investimento + rendimento;
    arrayResultado.push(valorAtualizado);
    investimento = valorAtualizado;
    mes += 1;
  }
  return arrayResultado;
}

function ChartApp() {
  const [valueSlider, setValueSlider] = useState(1000);

  const [options, setOptions] = useState({
    title: 'Gráfico Bar',
  });

  

  const handleSliderValue = (event, newValue) => {
    setValueSlider(newValue);
  };

  const [data, setData] = useState(() => {
    const val = [['Meses', 'Quantidade']];

    const array = calculo(valueSlider);
    array.forEach((valor, indice) => {
      val.push([String(indice + 1), valor])
    })

    return val;
  });

  useEffect(() => {
    const val = [['Meses', 'Quantidade']];

    const array = calculo(valueSlider);
    array.forEach((valor, indice) => {
      val.push([String(indice + 1), valor])
    })

    setData(val);
  }, [valueSlider])

  return (
    <div className="App">
      <TextField
        id="outlined-basic"
        label="Valor"
        variant="outlined"
        value={valueSlider}
        onChange={(e) => setValueSlider(Number(e.target.value))}
      />

      <Slider
        value={valueSlider}
        onChange={handleSliderValue}
        min={1000}
        max={10000}
        step={1000}
      />

      <header className="App-header">
        <div>
            <Chart
              width={'80vw'}
              height={'100vh'}
              chartType="Bar"
              data={data}
              options={{
                colors: ['#FFCC00'],
              }}
            />,
        </div>
      </header>
    </div>
  );
}

export default ChartApp;
