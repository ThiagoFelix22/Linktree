import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db } from "../../services/firebaseConnection";
import { setDoc, getDoc, doc } from "firebase/firestore";

// setDoc: para adicionar um documento com um id específico
// addDoc: para adicionar um documento com um id gerado automaticamente
// getDoc: para pegar um documento específico
// doc: para acessar um documento

export function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFacebook(snapshot.data().facebook);
          setInstagram(snapshot.data().instagram);
          setGithub(snapshot.data().github);
        }
      });
    }
    loadLinks();
  }, []);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    // a diferença entre setDoc e addDoc é que o setDoc você precisa passar o id do documento que você quer criar ou atualizar, já o addDoc ele vai criar um id automaticamente para o documento que você está criando, então no caso do setDoc a gente está passando o id "link" para o documento que a gente quer criar ou atualizar na coleção "social", e os dados que a gente quer salvar nesse documento são os links do facebook, instagram e github.
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      github: github,
    })
      .then(() => {
        alert("Links salvos com sucesso!");
      })
      .catch((error) => {
        alert("Ops, erro ao salvar os links!" + error);
      });
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Redes sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="font-medium text-white mt-2 mb-2">
          Link do facebook
        </label>
        <Input
          type="url"
          value={facebook}
          placeholder="Digite a url do facebook..."
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="font-medium text-white mt-2 mb-2">
          Link do instagram
        </label>
        <Input
          type="url"
          value={instagram}
          placeholder="Digite a url do instagram..."
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="font-medium text-white mt-2 mb-2">
          Link do github
        </label>
        <Input
          type="url"
          value={github}
          placeholder="Digite a url do github..."
          onChange={(e) => setGithub(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
}
