"use client"

import { writeToServer } from "@/actions/settings"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AquariusView } from "@/store/aquarius-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { useToast } from "./ui/use-toast"
import { Input } from "./ui/input"

const formSchema = z.object({
  demo: z.boolean(),
  floors: z.array(z.object({ name: z.string().max(2), value: z.string() })),
  lowestFloor: z.coerce.number().max(3).min(-3),
  topFloor: z.coerce.number().max(32).min(1),
})

type FormType = z.infer<typeof formSchema>

export default function SettingsForm({
  aquariusValues,
}: {
  aquariusValues: AquariusView
}) {
  const { demo, floors, topFloor, lowestFloor } = aquariusValues
  const { toast } = useToast()
  const [formFloors, setFormFloors] = useState(floors)

  const form = useForm<FormType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      demo,
      floors,
      topFloor,
      lowestFloor,
    },
  })

  const { fields, append, remove } = useFieldArray<FormType>({
    control: form.control,
    name: "floors",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newData = { ...aquariusValues, ...values }

    const response = await writeToServer(newData)

    response.success
      ? toast({ title: response.success })
      : toast({ title: response.error })
  }

  useEffect(() => {
    async function addFields() {
      if (await form.trigger(["lowestFloor", "topFloor"])) {
        remove()
        formFloors.map((floor) => append(floor, { shouldFocus: false }))
      }
    }
    addFields()
  }, [formFloors])

  useEffect(() => {
    async function generateList() {
      const trigger = await form.trigger(["lowestFloor", "topFloor"])
      if (!trigger) return

      const lowest = Number(form.watch("lowestFloor"))
      const highest = Number(form.watch("topFloor"))

      let list = []
      for (let i = lowest; i <= highest; i++) {
        console.log(i)
        list.push({
          name: i.toString(),
          value: i.toString(),
        })
      }

      const finalList = list.map((floor) => {
        const found = formFloors.find(
          (formFloor) => formFloor.value === floor.value
        )
        if (found) return found
        return floor
      })
      setFormFloors(finalList)
    }

    generateList()
  }, [form.watch("lowestFloor"), form.watch("topFloor")])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-md"
      >
        <FormField
          control={form.control}
          name="demo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Modalità Demo</FormLabel>
                <FormDescription>Utilizza la modalità demo</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Modifica Piani</h2>
          <FormField
            control={form.control}
            name="lowestFloor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Piano più basso</FormLabel>
                  <FormDescription>
                    Valore del piano più basso (ex:-2)
                  </FormDescription>
                </div>
                <div className="space-y-2">
                  <FormLabel>Modifica nome </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topFloor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Piano più alto</FormLabel>
                  <FormDescription>
                    Valore del piano più alto (ex:8)
                  </FormDescription>
                </div>
                <div className="space-y-2">
                  <FormLabel>Modifica nome </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`floors.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-end justify-between rounded-lg border p-4">
                  <div className="space-y-2">
                    <span className="text-lg font-medium">
                      Piano {form.getValues("floors")[index].value}
                    </span>
                    <FormDescription>
                      Modifica il testo per il piano{" "}
                      {form.getValues("floors")[index].value}
                    </FormDescription>
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Modifica nome </FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
