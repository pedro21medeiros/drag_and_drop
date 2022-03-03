import React from 'react';
import { parse } from 'papaparse';
import './App.css'

function App() {
  const [csvData, setCsvData] = React.useState([{}]);

  return (
    <div className='container'>
      <h1 className='title'>Importe seu CSV e transforme-o em uma tabela editável:</h1>
      <div className='dragContainer'

        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();

          Array.from(e.dataTransfer.files)
          .filter((file) => file.type === "text/csv")
          .forEach(async (file) => {
            const text = await file.text();
            // console.log(text)
            const result = parse(text, { header: true });
            // console.log(result)
            setCsvData([...result.data]);
            // setCsvData(result)
          });
        }}
        >
        Arraste aqui seu CSV
      </div>



      <table className='table'>
        <tbody>
          <tr contenteditable="true">
            {/* <td>{Object.getOwnPropertyNames(csvData)}</td> */}
            {csvData.map((csvItem) => (
              <td contenteditable="true">
                {csvItem.id}<span>  {csvItem.nome}</span> {csvItem.telefone}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
