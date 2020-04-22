import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(function (response) {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Test Add new repository",
      url: "https://github.com/luka-rmar/codenation-IMDB",
      techs: ["react", "node"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter((repo) => repo.id !== id);

    await api.delete(`/repositories/${id}`);

    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;


// import React, {useEffect, useState, useRef} from "react";
// import api from './services/api'

// import "./styles.css";

// export default function App() {
//   const [list, setList] = useState([]);
//   const [contTechs, setContTechs] = useState(0);
//   const inputRef = useRef(null)

   
  
//   useEffect(()=>{
//      async function listRepositories(){
//       const response = await (await api.get('repositories')).data;
//       const listTitle = response.map(({id,title})=>({id,title}))
//       setList(listTitle);
//     }
//     listRepositories();
//   },[list])

//   function addInput(e){
//     e.preventDefault()

//     if(contTechs <=5){
//       const newInput = document.getElementById("techs").cloneNode(true);
//       const destino = document.getElementById("Boxtechs");
//       newInput.value = "";
      
//       destino.appendChild(newInput);
//       setContTechs(contTechs + 1);
//     }
//   }

//   async function handleAddRepository(e) {
//     e.preventDefault()
//     const newRepo = inputRef.current.elements;
//     const repos = {};
//     const techs = [];
//     for(let i = 0; i < newRepo.length; i++){
//       if(newRepo[i].type !== 'submit'){
//         const { name, value } = newRepo[i];
//         if(name === 'techs' && value){
//           techs.push(value);
//         }

//         if(value === ""){
//           return newRepo[i].style.borderColor = "red";
//         }
//         repos[name] = value;
//         newRepo[i].style.borderColor = "";
//         newRepo[i].value = "";
//       }
//     }
//     repos['techs'] = techs;
    
//     await api.post("repositories",repos);
    
//   }

//   // 109.227.487.13

//   async function handleRemoveRepository(id) {
//       await api.delete(`repositories/${id}`);
//   }

//   return (
//     <div className="container">
      
//       <form id="form" className="form" ref={inputRef} onSubmit={handleAddRepository}>
//         <div className="boxInfos">
//           <input name="url" placeholder="Url repositório" />
//           <input name="title" placeholder="Título do projeto" />
//           <button onClick={()=>document.addEventListener('submit', handleAddRepository)}>Adicionar</button>
//           <button onClick={addInput}>+Tec</button>  
//         </div>

//         <div id="Boxtechs">
//             <input id="techs" name="techs" placeholder="Tecnologia" />
//         </div>
//       </form>
//       <ul data-testid="repository-list">
//         {list.map(({id, title})=>(
//         <li>
//           <h3>{title}</h3>
//           <button onClick={() => handleRemoveRepository(id)}>
//             Remover
//           </button>
//         </li>
//         ))}
//       </ul>

//     </div>
//   );
// }

