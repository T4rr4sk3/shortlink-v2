"use client"

import { MainButton } from "@app/components/common/mainButton";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import type { ErrorPageProps } from "@app/types/props";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return(
    <MainWrapperWithNav>
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-semibold">Oops, algo deu errado!</h1>

        <p>Identificamos que ocorreu o seguinte erro por baixo dos panos:</p>

        <code className="block">
          &quot;{error.message}&quot; ({error.digest || "0"})
        </code>

        <p>
          Para tentar novamente, basta clicar no botão abaixo.
          <br />
          Se o erro persistir, contate o <b>administrador do sistema</b>.
        </p>

        <MainButton variant="primary-stroke" onClick={() => reset()}>
          Tentar Novamente
        </MainButton>
      </div>
    </MainWrapperWithNav>
  )
}