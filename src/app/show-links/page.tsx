import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import ShowLinksComponent from "@app/components/showLinks/component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links"
}

export default function ShowLinksPage() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Links </h1>
        <ShowLinksComponent />
      </div>
    </MainWrapperWithNav>
  )
}
