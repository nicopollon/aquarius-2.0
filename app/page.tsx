import AquariusView from "@/components/aquarius-view"
import { promises as fs } from "fs"

async function Page() {
  const file = await fs.readFile(process.cwd() + "/data/settings.json", "utf8")
  const aquariusValues = JSON.parse(file)

  return <AquariusView aquariusValues={aquariusValues} />
}

export default Page
