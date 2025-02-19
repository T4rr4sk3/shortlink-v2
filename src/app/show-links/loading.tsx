import LoadingIcon from "@app/components/icons/loading";
import MainWrapperWithNav from "@app/components/wrappers/mainWithNav";

export default function ShowLinksPageLoading() {
  return(
    <MainWrapperWithNav>
      <div className="w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold"> Links </h1>

        <h2>
          <LoadingIcon className="inline" /> Carregando links...
        </h2>
      </div>
    </MainWrapperWithNav>
  )
}
