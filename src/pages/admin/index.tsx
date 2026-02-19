import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { useState, useEffect } from "react"

 import { FiTrash } from 'react-icons/fi'
 import { db } from "../../services/firebaseConnection"
 import {addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc} from "firebase/firestore"
//  addDoc: para adicionar um documento
// collection: para acessar uma coleção
// onSnapshot: para ouvir as mudanças em tempo real sem precisar atualizar a página todas as vezes que houver uma mudança no nosso firebase ele vai sempre ficar ouvindo e de olho nas mudanças e atualizar a nossa aplicação em tempo real

// query: para criar uma consulta
// doc: para acessar um documento
// deleteDoc: para deletar um documento

export function Admin(){
  const [nameInput, setNameInput] = useState("")
  const [urlinput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#ffffff")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#000000")

  const [links, setLinks] = useState<LinkProps[]>([])
 
  interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
  }
 
  useEffect(() => {
    // collection significa coleção, ou seja, aonde os dados serão armazenados
    // query é a consulta, ou seja, a forma como os dados serão ordenados ou filtrados
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          textColor: doc.data().textColor,
          backgroundColor: doc.data().backgroundColor
        })
      })
      setLinks(lista);
    });
  // o return () => unsub(); ele vai ser executado quando o componente for desmontado, ou seja, quando a gente sair da página ele vai parar de ouvir as mudanças no firebase, para evitar que a gente tenha problemas de performance ou de memória
    return () =>{
      unsub();
    };

  }, [])

  async function handleRegister(e: React.FormEvent){
    e.preventDefault();

    if(nameInput === "" || urlinput === ""){
      alert("Preencha todos os campos");
      return;
    }
     
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlinput,
      textColor: textColorInput,
      backgroundColor: backgroundColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("");
      setUrlInput("");
     console.log("Link registrado com sucesso");
    })
    .catch((error) => {
      console.error("Erro ao registrar o link: ", error);
    })
  }

     function handleDeleteLink(id: string){
     const confirmDelete = doc(db, "links", id);
     deleteDoc(confirmDelete)
     .then(() => {
       alert("Link deletado com sucesso");
     })
     .catch((error) => {
       alert("Erro ao deletar o link: " + error);
     })
   }


   return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
    <Header />

   <form className="flex flex-col max-w-xl mt-8 mb-3 w-full" onSubmit={handleRegister}>
     <label>Nome do link</label>
     <Input
     placeholder="Nome do link"
     value={nameInput}
     onChange={(e) => setNameInput(e.target.value)} 
     />
     <label>Url do link</label>
     <Input
     type="url" 
     placeholder="Url do link"
     value={urlinput}
     onChange={(e) => setUrlInput(e.target.value)} 
     />
     
     <section className="flex my-4 gap-5">
      <div className="">
        <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
        <input
        type="color"
        value={textColorInput} 
        onChange={(e) => setTextColorInput(e.target.value)}
        />
      </div>

      <div>
        <label className="text-white font-medium mt-2 mb-2 ">Cor do link</label>
        <input
        type="color"
        value={backgroundColorInput} 
        onChange={(e) => setBackgroundColorInput(e.target.value)}
        />
      </div>
     </section>
      {/* renderizaçao condicional */}
    {nameInput !== "" &&(
      <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/15 border rounded-md">
       <label className="text-white font-medium mt-2 mb-2 ">Veja como esta ficando:</label>
       <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3" style={{marginBottom: 8,marginTop: 8, backgroundColor: backgroundColorInput}}>
       <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
       </article>
     </div>
    )}

    <button type= "submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center">
      Cadastrar
    </button>
   </form>
  
    <h2 className="font-bold text-white mb-4 text-2xl"> 
      Meus links
    </h2>

    {links.map((link) => (
       <article className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none" style={{backgroundColor: link.backgroundColor, color: link.textColor}} key={link.id}>
        <p>{link.name}</p>

        <div>
        <button className="rounded border border-dashed p-1" onClick={() => handleDeleteLink( link.id)}>
          <FiTrash size={18} color="#fff"/>
        </button>
      </div>
    </article>
    ))}

    </div>
  )
}
