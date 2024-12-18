import ShowLinksByTagComponent from "@app/components/showLinksByTag/component";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import { getTagByIdServer } from "@app/bin/endpoints/linkTag";
import type { WithSearchParams } from "@app/types/props";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { dataIsApiCallError } from "@app/lib/api";

export const metadata: Metadata = {
  title: "Links"
}

type Params = { "tag-id": string | undefined }
export default async function ShowLinksPage({ searchParams }: WithSearchParams<Params>) {
  const tagId = searchParams["tag-id"]
  if(!tagId) redirect("/show-links")
  let tagName = "", isError = false
  if(tagId) {
    const result = await getTagByIdServer(tagId)
    isError = dataIsApiCallError(result)
    tagName = result.name
  }
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> {isError? "Erro:" : "Tag"} &quot;{tagName}&quot; </h1>

        <ShowLinksByTagComponent tagIdParamName="tag-id" />
      </div>
    </MainWrapperWithNav>
  )
}
