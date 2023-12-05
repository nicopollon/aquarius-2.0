"use client"
import useAquariusStore from "@/store/aquarius-store"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function FloorButton({ floor }: { floor: string }) {
  const socket = useAquariusStore((state) => state.socket)
  const aquariusView = useAquariusStore((state) => state.aquariusView)

  const { selectedFloors } = aquariusView

  const floorSelected = (floor: string) => {
    socket && socket.emit("floor-selected", floor)
  }

  return (
    <Button
      disabled={aquariusView.floorNumber === floor}
      variant={"ghost"}
      className={cn(
        selectedFloors.includes(floor)
          ? "border-8 border-green-500"
          : "border-0",
        `w-[250px] h-[250px] text-6xl font-semibold shadow  `
      )}
      onClick={() => floorSelected(floor)}
    >
      {floor}
    </Button>
  )
}
