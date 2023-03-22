import jwt_decode from "jwt-decode";
let Access = localStorage.getItem("RefereshToken");
let token = localStorage.getItem("Token")

if(token){
  const decoded = jwt_decode(token);
  const currentTime = new Date().getTime();
  const expTime = decoded.exp*1000;
  if(currentTime > expTime){
    apicall();
  }
  console.log(currentTime > expTime, "--decode--->")
  console.log(new Date(decoded.exp*1000),"---this--->")
}

function apicall(){   
  fetch("https://todo-api-xu4f.onrender.com/user/access-token-generate",{
  method:"POST",
  headers:{
    'Content-Type': 'application/json',
    "Authorization": `${Access}`    
  }, 
})}
// .then((resp) => {
  // console.log(resp.access_token,"----herer access token----->")
  // console.log(resp,"--here resp---->")
// })
// console.log(responce)
// }

function useFetchAPI(){
  const myHeaders = new Headers();
  let token = localStorage.getItem("Token")||""
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);  
  const base = "https://todo-api-xu4f.onrender.com/";


   const apiFunction = async (endpoint, type, data, res) => {
    let raw = JSON.stringify(data);

    let requestOptions = {
      method: type,
      headers: myHeaders,
    //body : raw,
      redirect: "follow",
    };
    
    if(data)
    requestOptions.body = raw       

    try {
      const response = await fetch(base + endpoint, requestOptions);
      if (!response.ok) {
        const e = await response.json();
        console.log(e.message)
        throw new Error(e.message);
      } 
        const data = await response.json();
        res(data, null);            
    } 
    catch (error) {
      res(null, error.message);   
    }
    
  };
  return apiFunction;

}

export default useFetchAPI;
