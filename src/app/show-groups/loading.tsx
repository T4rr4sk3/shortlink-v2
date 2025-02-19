import LoadingIcon from "@app/components/icons/loading";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";

export default function ShowGroupsPageLoading() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Grupos </h1>

        <h2>
          <LoadingIcon className="inline" /> Carregando grupos...
        </h2>
      </div>
    </MainWrapperWithNav>
  )
}
