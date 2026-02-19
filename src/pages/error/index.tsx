import { Link } from "react-router-dom";
export function Error() {

   return(
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      <h1 className="text-9xl font-bold text-white">404</h1>
      <h1 className="font-bold text-4xl mb-4 text-white">Ops, essa pagina nao existe</h1>
      <Link className="bg-gray-50/20 rounded text-white py-2 px-4 font-medium" to="/">Voltar para a pagina inicial</Link>
    </div>
   )
}