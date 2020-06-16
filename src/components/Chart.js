import React, { useState } from 'react';

import ReactDOM from 'react-dom';
import { Slider, TextField } from '@material-ui/core';

import { Chart } from 'react-google-charts';

function ChartApp() {
  const [valueSlider, setValueSlider] = useState(1000);

  const [options, setOptions] = useState({
    title: 'Gráfico Bar',
  });

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

  let array = calculo(valueSlider);

  const [data, setData] = useState([
    ['Meses', 'Quantidade'],
    ['1', array[0]],
    ['2', array[1]],
    ['3', array[2]],
    ['4', array[3]],
    ['5', array[4]],
    ['6', array[5]],
    ['7', array[6]],
    ['8', array[7]],
    ['9', array[8]],
    ['10', array[9]],
    ['11', array[10]],
    ['12', array[11]],
  ]);

  const handleSliderValue = (event, newValue) => {
    setValueSlider(newValue);
  };

  return (
    <div className="App">
      <TextField
        id="outlined-basic"
        label="Valor"
        variant="outlined"
        value={valueSlider}
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
          {array.map(
            <Chart
              width={'80vw'}
              height={'100vh'}
              chartType="Bar"
              data={data}
              options={{
                colors: ['#FFCC00'],
              }}
            />,
          )}
        </div>
      </header>
    </div>
  );
}

export default ChartApp;
