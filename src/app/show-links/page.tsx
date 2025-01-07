import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import ShowLinksComponent from "@app/components/showLinks/component";
import { getGroupByIdServer } from "@app/bin/endpoints/linkGroup";
import type { WithSearchParams } from "@app/types/props";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links"
}

type Params = { "group-id": string | undefined }
export default async function ShowLinksPage({ searchParams }: WithSearchParams<Params>) {
  const groupId = searchParams["group-id"]
  let groupName = ""
  if(groupId) {
    const result = await getGroupByIdServer(groupId)
    groupName = result.name
  }
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> {groupId && "Grupo:"} {groupName || "Links"} </h1>

        <ShowLinksComponent groupIdParamName="group-id" />
      </div>
    </MainWrapperWithNav>
  )
}
