"use server"

import { AquariusView } from "@/store/aquarius-store"
import { writeFileSync } from "fs"
import { revalidatePath } from "next/cache"

export async function writeToServer(aquariusValues: AquariusView) {
  try {
    writeFileSync(
      process.cwd() + "/data/settings.json",
      JSON.stringify(aquariusValues, null, 2),
      "utf8"
    )
    console.log("JSON file updated successfully!")
    revalidatePath("/")
    return { success: "Settings saved successfully" }
  } catch (error) {
    console.error("Error updating JSON file:", error)
    return { error: "Settings saved successfully" }
  }
}
