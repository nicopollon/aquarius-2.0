"use client"

import useAquariusStore from "@/store/aquarius-store"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { useEffect } from "react"

export default function FloorNumber() {
  const aquariusView = useAquariusStore((state) => state.aquariusView)
  const removeSelectedFloors = useAquariusStore(
    (state) => state.removeSelectedFloors
  )

  const setFloorNumber = useAquariusStore((state) => state.setFloorNumber)
  const setArrowDirection = useAquariusStore((state) => state.setArrowDirection)
  const { floorNumber, floors, demo, selectedFloors } = aquariusView
  useEffect(() => {
    function delayChangeFloor() {
      if (selectedFloors.length === 0) {
        setArrowDirection("OFF")
      }
    }

    const currentFloorIndex = floors.indexOf(floorNumber)
    const nextFloorIndex = floors.indexOf(selectedFloors[0])

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

      const interval = setInterval(() => {
        const floor = slicedFloors[index]
        if (floor) {
          setFloorNumber(floor)
          removeSelectedFloors(floor)
          delayChangeFloor()
        }
        console.log(floor, selectedFloors)

        index += 1
        if (index === slicedFloors.length || selectedFloors.length === 0) {
          clearInterval(interval)
          console.log("clear interval")
        }
      }, 5000)
    }
  }, [demo, selectedFloors])

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-8xl">{floorNumber}</div>
      <DirectionArrow />
    </div>
  )
}

function DirectionArrow() {
  const aquariusView = useAquariusStore((state) => state.aquariusView)
  const { direction } = aquariusView

  if (direction === "DOWN") return <ChevronDown className="w-24 h-24" />
  if (direction === "UP") return <ChevronUp className="w-24 h-24" />
  if (direction === "OFF") return <ChevronsUpDown className="w-24 h-24" />
}
