import CreateLinkForm from "@app/components/createLink/form";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Link"
}

export default function CreateLinkPage() {
  return(
    <MainWrapperWithNav>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Criar um link </h1>
        <p> Crie um link curto para a url desejada. </p>
        <CreateLinkForm />
      </div>
    </MainWrapperWithNav>
  )
}