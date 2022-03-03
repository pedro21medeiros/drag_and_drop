import React from 'react';
import { parse } from 'papaparse';
import './App.css'

function App() {
  const [hover, setHover] = React.useState(false);
  const [csvData, setCsvData] = React.useState([{}]);

  return (
    <div className='container'>
      <h1 className='title'>Importe seu CSV</h1>
      <div className='dragContainer'
        onDragEnter={() => {
          setHover(true);
        }}
        onDragLeave={() => {
          setHover(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);

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
        Arraste seu CSV aqui!
      </div>



      <table className='table'>
        <tbody>
          <tr contenteditable="true">
            {csvData.map((csvItem) => (
              <td contenteditable="true" key={csvItem.id}>
                <strong>  {csvItem.nome}</strong> {csvItem.telefone}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
