import ShowTagsComponent from "@app/components/showTags/component";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags"
}

export default function ShowTagsPage() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Tags </h1>
        <ShowTagsComponent tagNameParamName="tag-name" />
      </div>
    </MainWrapperWithNav>
  )
}
