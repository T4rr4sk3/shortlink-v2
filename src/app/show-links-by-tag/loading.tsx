import LoadingIcon from "@app/components/icons/loading";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";

export default function ShowLinksByTagPageLoading() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold">
          <LoadingIcon className="inline" /> Carregando tag...
        </h1>
      </div>
    </MainWrapperWithNav>
  )
}
