"use client"
import { cn } from "@/lib/utils"
import useAquariusStore from "@/store/aquarius-store"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

export default function FloorButton({
  floor,
}: {
  floor: { name: string; value: string }
}) {
  const socket = useAquariusStore((state) => state.socket)
  const aquariusView = useAquariusStore((state) => state.aquariusView)

  if (!aquariusView) return <></>
  const { selectedFloors, floorNumber } = aquariusView

  const floorSelected = (floor: string) => {
    socket && socket.emit("floor-selected", floor)
  }

  return (
    <motion.div
      whileTap={{
        scale: 0.9,
      }}
    >
      <Button
        disabled={floorNumber === floor.value}
        variant={"default"}
        onClick={() => floorSelected(floor.value)}
        className={cn(
          `w-[250px] h-[250px] text-6xl font-semibold shadow relative `
        )}
      >
        <span className="z-40">{floor.name}</span>
        <motion.svg
          viewBox="0 0 250 250"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            !selectedFloors.includes(floor.value) && "hidden",
            "absolute inset-0 rounded-lg"
          )}
        >
          <defs>
            <linearGradient id={`${floor.value}_gradient`}>
              <stop offset="0%" stopColor="#7A5FFF">
                <animate
                  attributeName="stop-color"
                  values="#7A5FFF; #01FF89; #7A5FFF"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>

              <stop offset="100%" stopColor="#01FF89">
                <animate
                  attributeName="stop-color"
                  values="#01FF89; #7A5FFF; #01FF89"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <motion.rect
            x="0"
            y="0"
            strokeWidth="12px"
            stroke={`url(#${floor.value}_gradient)`}
            width="250"
            height="250"
            className="rounded-lg"
          />
        </motion.svg>
      </Button>
    </motion.div>
  )
}
