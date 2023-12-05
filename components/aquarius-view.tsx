"use client"

import useAquariusStore from "@/store/aquarius-store"
import FloorButton from "./floor-button"
import FloorNumber from "./floor-number"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export default function AquariusView() {
  const connect = useAquariusStore((state) => state.connect)
  const aquariusView = useAquariusStore((state) => state.aquariusView)

  connect()

  return (
    <AspectRatio
      ratio={9 / 16}
      className="max-w-[1080px] max-h-[1920px] bg-slate-50"
    >
      <div className="pt-12 px-4 flex flex-col h-full items-center justify-evenly">
        <FloorNumber />
        <div className="grid grid-cols-2 place-items-center w-fit  gap-8">
          {aquariusView.floors.map((floor) => (
            <FloorButton key={floor} floor={floor} />
          ))}
        </div>
      </div>
    </AspectRatio>
  )
}
