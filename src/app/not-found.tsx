import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import Link from "next/link";

export default function NotFoundPage() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Página não encontrada </h1>

        <p> A página que você tentou acessar não existe. </p>

        <Link className="underline" href="/">
          Voltar para a página inicial
        </Link>
      </div>
    </MainWrapperWithNav>
  )
}