import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // oque e o OnSubmit de forma simplificada, ele é um evento que é acionado quando o usuário envia um formulário, ou seja, quando ele clica no botão de submit ou pressiona a tecla Enter enquanto está focado em um campo de entrada. O handleSubmit é a função que é chamada quando o evento onSubmit é acionado, e ela recebe o evento como parâmetro (e: React.FormEvent) para que possamos evitar o comportamento padrão do formulário (e.preventDefault()) e realizar as ações desejadas, como enviar os dados para um servidor ou exibir uma mensagem de sucesso.

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(email, password);

    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        console.log("Usuário logado com sucesso");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        console.log("Erro ao fazer login");
      });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col">
        <Input
          placeholder="Digite seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="***********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 rounded border-0 text-lg font-medium bg-blue-600 cursor-pointer text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
