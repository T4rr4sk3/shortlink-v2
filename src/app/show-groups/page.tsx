import ShowGroupsComponent from "@app/components/showGroups/component";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grupos"
}

export default function ShowGroupsPage() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Grupos </h1>
        <ShowGroupsComponent />
      </div>
    </MainWrapperWithNav>
  )
}
