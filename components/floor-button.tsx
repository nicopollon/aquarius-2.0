"use client"
import { cn } from "@/lib/utils"
import useAquariusStore from "@/store/aquarius-store"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

export default function FloorButton({ floor }: { floor: string }) {
  const socket = useAquariusStore((state) => state.socket)
  const aquariusView = useAquariusStore((state) => state.aquariusView)

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
        disabled={floorNumber === floor}
        variant={"default"}
        onClick={() => floorSelected(floor)}
        className={cn(
          `w-[250px] h-[250px] text-6xl font-semibold shadow relative `
        )}
      >
        <span className="z-40">{floor}</span>
        <motion.svg
          viewBox="0 0 250 250"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            !selectedFloors.includes(floor) && "hidden",
            "absolute inset-0"
          )}
        >
          <defs>
            <linearGradient id={`${floor}_gradient`}>
              <stop offset="0%" stop-color="#7A5FFF">
                <animate
                  attributeName="stop-color"
                  values="#7A5FFF; #01FF89; #7A5FFF"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>

              <stop offset="100%" stop-color="#01FF89">
                <animate
                  attributeName="stop-color"
                  values="#01FF89; #7A5FFF; #01FF89"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <motion.rect
            x="0"
            y="0"
            strokeWidth="5"
            strokeLinejoin="round"
            stroke={`url(#${floor}_gradient)`}
            width="250"
            height="250"
          />
        </motion.svg>
      </Button>
    </motion.div>
  )
}
