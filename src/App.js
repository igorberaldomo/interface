import { useCallback, useState } from 'react';
import axios from 'axios';
import './app.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
function App() {
  const [data, setData] = useState([]);

  const loaddata = useCallback(async () => {
    const { data: requestdata } = await axiosInstance.get('/profiles');
    console.log(requestdata);
    setData(requestdata);

  }, [])

  const deleteData = async () => {
    setData([]);
    axiosInstance.delete('http://localhost:3000/profiles');

  }

  return (
    <div className="App">        
    <h1 className='title'>Random User Generator</h1>
      <div className='rowbox'>

      <div className='row'>
        <div className='buttonBox'>
          <button onClick={loaddata}>Load Data</button>
          <button onClick={deleteData}>Clear Data</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>birthdate</th>
            </tr>
          </thead>
          <tbody>
            {  data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.birthdate.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default App;