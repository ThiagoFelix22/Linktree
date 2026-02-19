import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: React.ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // função que escuta se o usuário está logado ou não onAuthStateChanged
      if (user) {
        // salvar os dados do usuario no localStorage e mostra nosso uid e email si esta logado
       const usedata = {
       uid: user?.uid,
       email: user?.email,
      } 
        localStorage.setItem("linksUser", JSON.stringify(usedata));
        // parou de carregar e esta logado
        setLoading(false);
        setSigned(true);
      } else {
        // Parou de carregar nao esta logado
        setLoading(false);
        setSigned(false);
      }
    });
    // o return () => unsub(); ele vai ser executado quando o componente for desmontado
    return () => unsub();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
