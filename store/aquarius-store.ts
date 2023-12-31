import { useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { create } from "zustand"

export type AquariusView = {
  selectedFloors: string[]
  floorNumber: string
  direction: "UP" | "DOWN" | "OFF"
  demo: boolean
  floors: { name: string; value: string }[]
  lowestFloor: number
  topFloor: number
}

export type SocketBroadcastMessage = {
  from: string
  message: string
  timestamp: number
}

type Store = {
  socket: null | Socket
  aquariusView: AquariusView | null
  connect: () => void
  disconnect: () => void
  setSelectedFloors: (selectedFloors: string) => void
  removeSelectedFloors: (selectedFloors: string) => void
  setFloorNumber: (floor: string) => void
  setArrowDirection: (arrowDirection: "UP" | "DOWN" | "OFF") => void
  setAquariusView: (aquariusView: AquariusView) => void
}

const useAquariusStore = create<Store>((set, get) => {
  return {
    socket: null,
    aquariusView: null,
    setAquariusView(aquariusView) {
      set({ aquariusView })
    },
    connect: () => {
      const {
        socket,
        setSelectedFloors,
        setFloorNumber,
        removeSelectedFloors,
        setArrowDirection,
      } = get()

      if (socket) {
        console.log("Connected to:", "http://localhost:3001")
        // Display error message if socket is already connected
      } else {
        console.log("Connecting to socket", "http://localhost:3001")
        const socket = io("http://localhost:3001")

        socket
          .on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id)
            // Update the socket in the global state when connected
            set({ socket })
          })
          .on("disconnect", () => {
            console.log("SOCKET DISCONNECTED!")
            // Set socket to null in the global state when disconnected
            set({ socket: null })
          })

        //ADD SOCKET EVENTS
        socket.on("floor-selected", (selectedFloor: string) => {
          setSelectedFloors(selectedFloor)
        })

        socket.on("floor-number", (floorNumber: string) => {
          setFloorNumber(floorNumber)
          removeSelectedFloors(floorNumber)
        })

        socket.on(
          "arrow-direction",
          (arrowDirection: "UP" | "DOWN" | "OFF") => {
            setArrowDirection(arrowDirection)
          }
        )
      }
    },
    disconnect: () => {
      const { socket } = get()
      if (socket) {
        socket.disconnect()
        set({ socket: null })
      } else {
        console.error("Socket not connected")
      }
    },
    setSelectedFloors: (selectedFloor: string) => {
      const { aquariusView } = get()
      if (!aquariusView) return
      const floors = aquariusView.selectedFloors
      if (!floors.includes(selectedFloor)) {
        set({
          aquariusView: {
            ...aquariusView,
            selectedFloors: [...floors, selectedFloor],
          },
        })
      }
    },
    removeSelectedFloors: (selectedFloor: string) => {
      const { aquariusView } = get()
      if (!aquariusView) return

      const { selectedFloors } = aquariusView

      if (selectedFloors.includes(selectedFloor)) {
        const updatedFloors = selectedFloors.filter(
          (floor) => floor !== selectedFloor
        )
        set({
          aquariusView: {
            ...aquariusView,
            selectedFloors: updatedFloors,
          },
        })
      }
    },
    setFloorNumber(floorNumber) {
      const { aquariusView } = get()
      if (!aquariusView) return

      set({ aquariusView: { ...aquariusView, floorNumber: floorNumber } })
    },
    setArrowDirection(arrowDirection) {
      const { aquariusView } = get()
      if (!aquariusView) return

      set({ aquariusView: { ...aquariusView, direction: arrowDirection } })
    },
  }
})

export default useAquariusStore
