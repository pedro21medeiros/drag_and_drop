import React from 'react';
import { parse } from 'papaparse';
import './App.css'

function App() {
  const [csvData, setCsvData] = React.useState([{}]); // Hook React para manipular estado;

  return (
    <div className='container'>

      <h1 className='title'>Importe seu CSV e transforme-o em uma tabela editável:</h1>

      <div className='dragContainer'

        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault(); // Evita o padrão, para que não faça o download do arquivo CSV;

          Array.from(e.dataTransfer.files)
          .filter((file) => file.type === "text/csv") // Filtra o arquivo para garantir que seja um CSV;
          .forEach(async (file) => {
            const text = await file.text();
            // Aqui vai o "parseador" do framework Papaparse;
            const result = parse(text, { header: true });
            // O parse aqui tem o papel de transformar string em um JSON;
            setCsvData([...result.data]);
            // Salva no estado os dados de CSV já convertidos;
          });
        }}
        >
        Arraste aqui seu CSV
      </div>

      <table className='table'>
        <tbody>
          <tr contenteditable="true">
            {csvData.map((csvItem) => ( // Itera e cria um novo array com os td da table;
              <td contenteditable="true">
                {csvItem.id}<span>  {csvItem.nome}</span> {csvItem.telefone}
              </td> // Puxa o valor das chaves para exibir na tabela;
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
