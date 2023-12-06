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
          <motion.linearGradient
            id={`${floor}_gradient`}
            animate={{
              rotate: 180,
            }}
            transition={{
              duration: 2,
              repeat: Infinity, // Set repeat to Infinity for continuous looping
            }}
          >
            <stop offset="50%" stopColor="#A6EA99" />
            <stop offset="50%" stopColor="red" />
          </motion.linearGradient>

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
