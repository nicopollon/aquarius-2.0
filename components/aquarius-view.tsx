"use client"

import useAquariusStore, {
  AquariusView as AquariusViewT,
} from "@/store/aquarius-store"
import FloorButton from "./floor-button"
import FloorNumber from "./floor-number"
import { Badge } from "./ui/badge"
import { useEffect } from "react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { AspectRatio } from "./ui/aspect-ratio"

export default function AquariusView({
  aquariusValues,
}: {
  aquariusValues: AquariusViewT
}) {
  const socket = useAquariusStore((state) => state.socket)
  const connect = useAquariusStore((state) => state.connect)
  const aquariusView = useAquariusStore((state) => state.aquariusView)
  const setAquariusView = useAquariusStore((state) => state.setAquariusView)

  useEffect(() => {
    connect()
    setAquariusView(aquariusValues)
  }, [])

  if (!aquariusView) return <></>

  return (
    <AspectRatio
      ratio={9 / 16}
      className="max-w-[1080px] max-h-[1920px] relative bg-slate-700"
    >
      <div>
        {" "}
        <Badge className="absolute top-4 right-4">
          {socket?.connected ? "Connected" : "No connection"}
        </Badge>
        <Link
          className={buttonVariants({ variant: "link" })}
          href={"/settings"}
        >
          Edit
        </Link>
      </div>
      <div className="pt-12 px-4 flex flex-col h-full items-center justify-evenly">
        <FloorNumber />
        <div className="grid grid-cols-2 place-items-center w-fit  gap-8 ">
          {aquariusView.floors.map((floor) => (
            <FloorButton key={floor.name} floor={floor} />
          ))}
        </div>
      </div>
    </AspectRatio>
  )
}
