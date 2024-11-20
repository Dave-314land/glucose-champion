import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/form/button"
import { Input } from "../ui/form/input"
import { Calendar } from "../ui/form/calendar"
import { toast } from "../../hooks/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"



export default function GlucoseEntryForm() {
  const form = useForm()
  
  const onSubmit = (formData) => {
    try {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
          </pre>
        ),
      })
      console.log("Form Submitted", formData)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Glucose Reading (ml)</FormLabel>
                  <FormControl>
                    <Input type="text" id="value" placeholder="100" {...field} />
                  </FormControl>
                  <FormDescription>Enter your blood glucose reading</FormDescription>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <FormField 
              control={form.control}
              name="timestamp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time of Reading</FormLabel>
                  <FormControl>
                    <Input type="text" id="timestamp" placeholder="11/19/2024 10:32" {...field} />
                  </FormControl>
                  <FormDescription>Enter date and time reading taken</FormDescription>
                  <FormMessage />
                </FormItem> 
              )}
            />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
