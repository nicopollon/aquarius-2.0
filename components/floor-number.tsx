"use client"

import useAquariusStore from "@/store/aquarius-store"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function FloorNumber() {
  const aquariusView = useAquariusStore((state) => state.aquariusView)
  const removeSelectedFloors = useAquariusStore(
    (state) => state.removeSelectedFloors
  )

  const setFloorNumber = useAquariusStore((state) => state.setFloorNumber)
  const setArrowDirection = useAquariusStore((state) => state.setArrowDirection)
  const [number, setNumber] = useState<string>()
  if (!aquariusView) return <></>

  const { floorNumber, direction, floors, demo, selectedFloors } = aquariusView

  useEffect(() => {
    function delayChangeFloor() {
      if (selectedFloors.length === 0) {
        setArrowDirection("OFF")
      }
    }

    const currentFloorIndex = floors.findIndex(
      (floor) => floor.value === floorNumber
    )
    const nextFloorIndex = floors.findIndex(
      (floor) => floor.value === selectedFloors[0]
    )

    function getDirection() {
      if (nextFloorIndex === -1) return setArrowDirection("OFF")
      if (nextFloorIndex > currentFloorIndex) return setArrowDirection("UP")
      return setArrowDirection("DOWN")
    }

    getDirection()

    if (demo) {
      const slicedFloors =
        nextFloorIndex > currentFloorIndex
          ? floors.slice(currentFloorIndex, nextFloorIndex + 1)
          : floors.slice(nextFloorIndex, currentFloorIndex + 1).reverse()
      let index = 0
      console.log(slicedFloors)

      const interval = setInterval(() => {
        const floor = slicedFloors[index]
        if (floor) {
          setFloorNumber(floor.value)
          removeSelectedFloors(floor.value)
          delayChangeFloor()
        }

        index += 1
        if (index === slicedFloors.length || selectedFloors.length === 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
  }, [demo, selectedFloors])

  useEffect(() => {
    const floor = floors.filter((floor) => floor.value === floorNumber)
    setNumber(floor[0].name)
  }, [floorNumber])

  return (
    <div className="flex items-center justify-center gap-4 text-8xl">
      <motion.div
        key={`${number}_text`}
        animate={{
          opacity: [0, 1],
        }}
      >
        {number}
      </motion.div>
      <motion.div
        key={`${number}_arrow`}
        animate={{
          y:
            direction === "UP"
              ? [50, -2, 0]
              : direction === "DOWN"
              ? [-50, 2, 0]
              : [0],
          opacity: [0, 1],
        }}
      >
        <DirectionArrow />
      </motion.div>
    </div>
  )
}

function DirectionArrow() {
  const aquariusView = useAquariusStore((state) => state.aquariusView)
  if (!aquariusView) return <></>

  const { direction } = aquariusView

  if (direction === "DOWN") return <ChevronDown className="w-24 h-24" />
  if (direction === "UP") return <ChevronUp className="w-24 h-24" />
  if (direction === "OFF") return <ChevronsUpDown className="w-24 h-24" />
}
