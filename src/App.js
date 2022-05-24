
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
const [allData,setAllData] = useState([]);
const [filteredData,setFilteredData] = useState(allData);

let buttonstyle={
  backgroundColor:'',
  color: '#169EBF'
}

const handleSearch = (event) =>{
  let value = event.target.value;
 
  let result = [];
  result = allData.filter((data) => {
      data.name.toLowerCase().includes(value)
      return data.name.search(value) !== -1 || data.email.search(value) !== -1; 
  });

  setFilteredData(result);
}

useEffect(() => {
  axios('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log(response.data)
    setAllData(response.data);
    setFilteredData(response.data);
    })
    .catch(error => {
    console.log('Error getting fake data: ' + error);
    })
}, []);

  const textboxstyles = {
    display:'inline',
    width:'40%',
    height:40,
    float:'center',
    marginBottom:10,
    marginRight:10
  }
  const textstyles = {
    bold: {fontWeight: 'bold'}
}

const table ={
  float:'center'
}





  return (
    <div className="App">
      <div>
          <label style={textstyles.bold}>Users list</label>
        
     </div>  
     <div>
     <input type="text" style={textboxstyles} 
          placeholder="Search By UserName or email..." onChange={(event) =>handleSearch(event)} />
                <div style={{padding:10}}>
                {filteredData.map((value,index)=>{
                return(
                  <div>
                  <div key={value.id}>
                    <table style={table}>
                  <tr >
                    <td>{value.id}</td>
                    <td><p  style={textstyles.bold}>{value.name} </p></td>
                    <td><p  style={buttonstyle} >@{value.username} </p></td>
                   
                  </tr>
                  </table>               
                  </div>
                  </div>
                  
                )
                })}
                </div>
     </div>
    </div>
  );
}

export default App;
