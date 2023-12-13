import React from "react"
import { promises as fs } from "fs"
import SettingsForm from "@/components/edit-form"

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/data/settings.json", "utf8")
  const aquariusValues = JSON.parse(file)

  return (
    <div className="flex p-4 flex-col gap-4">
      <h1 className="text-2xl font-semibold">Edit your Aquarius</h1>
      <SettingsForm aquariusValues={aquariusValues} />
    </div>
  )
}
