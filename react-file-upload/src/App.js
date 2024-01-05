import { useState } from 'react';
import './App.css';

function App() {
const [file,setFile]=useState(null);
const [msg,setMsg]=useState(null)
const [returnData,setReturnData] = useState([])

function handleUpload(){
  if(!file){
    alert("no file selected")
    return
  }
  const fd = new FormData()
  fd.append("file",file)

 setMsg('Uploading...')
 fetch('http://localhost:3000/upload',{
    method: 'POST',
    body: fd,
    headers:{
      'Access-Control-Allow-Origin':'*'
  },
  }).then(res=>{
    if(!res.ok){
      throw new Error("Bad Response")
    }
    setMsg("Upload Successful")
    res.json().then(data=>{
      console.log("logging data", data)  
    setReturnData(data)
  
  })
  }).catch(err=>{
    setMsg("Upload Unsuccessful, ",err)
  })
}
console.log(returnData)



  return (
    <div className="App">
      <h1>Upload File</h1>
      <input onChange={(e)=>{ setFile(e.target.files[0]) }} type='file'></input>
      <button onClick={handleUpload}>Upload</button>
      {msg && <span>{msg}</span>}
      <ul>{returnData?.map((item,index)=>(
        <span key={item.timestamp}>
        <li>timestam: {item.timestamp}</li>
        <li>loglevel: {item.loglevel}</li>
        <li>transactionId: {item.transactionId}</li>
        <li>err: {item.err}</li>
        <br/>
        </span>
      ))}</ul>
{returnData.length>0 && <a
  type="button"
  href={`data:text/json;charset=utf-8,${encodeURIComponent(
   JSON.stringify(returnData)
  )}`}
  download="logs.json"
  >
 {`Download Json`}
 </a>}
    </div>
  );
}

export default App;


