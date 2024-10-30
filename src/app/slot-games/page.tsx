"use client";
import { HomeProvider } from "@/components/Home/provider/home-provider";
import { CategoriesGame } from "@/components/SlotGames/CategoriesGame";
import { SlotGameList } from "@/components/SlotGames/SlotGameList";

import React, { useState } from "react";

type Props = {};

export default function SlotGamesPage({ }: Props) {
  const [categoryActive, setCategoryActive] = useState<any>(null);

  return (
    <HomeProvider>
      <section className="container flex flex-col items-start justify-start min-h-screen gap-3 my-5 lg:flex-row">
        <div className="w-full lg:w-1/6">
          <CategoriesGame categoryActive={categoryActive} getFilterCategory={(value) => setCategoryActive(value)} />
        </div>
        <div className="w-full lg:flex-1 ">
          <SlotGameList categoryActive={categoryActive} />
        </div>
      </section>
    </HomeProvider>
  );
}
