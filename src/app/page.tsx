import { BannerHeader } from "@/components/Header/components/BannerHeader";
import { BoardSystems } from "@/components/Home/BoardSystems";
import { HotListGame } from "@/components/Home/HotListGame";
import { MainMenu } from "@/components/Home/MainMenu";
import { MenuSupport } from "@/components/Home/MenuSupport";
import RankList from "@/components/Home/RankList";
import ContentPage from "@/components/Home/components/ContentPage";
import WelcomeLogin from "@/components/Home/components/WelcomeLogin";
import { HomeProvider } from "@/components/Home/provider/home-provider";

export default function Home() {
  return (
    <>
      <main className="w-full">
        <WelcomeLogin />
        {/* 
          <MainMenu />
          <HotListGame />
          <div className="flex flex-col-reverse lg:flex-none lg:flex-col">
            <BoardSystems />
            <MenuSupport />
          </div>
          <RankList /> */}
        {/* <BannerHeader /> */}
        {/* <HotListGame /> */}
        <ContentPage />
      </main>
    </>
  );
}
