import NavLinks from "@app/components/common/navLinks";
import MainWrapper from "@app/components/wrappers/main";

export default function Home() {
  return (
    <MainWrapper className="pt-32">
      <div className="w-full flex justify-center pt-16">
        <NavLinks className="h-20" />
      </div>
    </MainWrapper>
    // <div className="">
    //   <NavLinks />
    // </div>
  );
}
