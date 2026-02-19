import { Social } from "../../components/social";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import {getDocs, collection, orderBy, query, doc, getDoc} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useState, useEffect } from "react";



  interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
  }

  interface SocialProps {
    facebook: string;
    instagram: string;
    github: string;
  }


 export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [social, setSocial] = useState<SocialProps>()

   useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef)
      .then((snapshot) => {
        let lista = [] as LinkProps[];
        snapshot.forEach((doc) => {
          // push adiciona um item no array, ou seja, a cada documento que a gente pegar do firebase ele vai adicionar um item no array links, e esse item vai ser um objeto com as propriedades id, name, url, textColor e backgroundColor, que são as mesmas propriedades que a gente tem no firebase, e o id é o id do documento que a gente pegou do firebase, e as outras propriedades são os dados do documento que a gente pegou do firebase.
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            textColor: doc.data().textColor,
            backgroundColor: doc.data().backgroundColor,
          });
        });
        setLinks(lista);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocial(){
      const docref = doc(db, "social", "link");
      getDoc(docref)
      .then((snapshot) => {
        if(snapshot.exists()){
          setSocial({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            github: snapshot.data().github
          })
        }
      })
    }
    loadSocial();
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-3xl font-bold text-white mt-20">Pagina home</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
       {links.map((link) => (
         <section style={{ backgroundColor: link.backgroundColor }} key={link.id} className="bg-white mb-4 w-full rounded-lg py-2 select-none transition-transform  hover:scale-105 cursor-pointer">
          <a href={link.url} target="_blank">
            <p className="text-base md:text-lg" style={{ color: link.textColor }}>
              {link.name}
            </p>
          </a>
        </section>
       ))}
       {/* RENDERIZAR OS LINKS AQUI CONDICIONAL OBJECTKEYS ELE VERIFICA SE O OBJETO LINKS ESTÁ VAZIO */}
          {links && Object.keys(links).length > 0 && (
          <footer className="flex justify-center mt-4 gap-4">
          <Social url={social?.facebook || ""}>
            <FaFacebook size={24} color="#fff" />
          </Social>
          <Social url={social?.instagram || ""}>
            <FaInstagram size={24} color="#fff" />
          </Social>
          <Social url={social?.github || ""}>
            <FaGithub size={24} color="#fff" />
          </Social>
        </footer>
          )}
      </main>
    </div>
  );
}
