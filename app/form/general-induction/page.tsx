"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { FormProgress } from "@/components/form-progress"
import { Shield, ArrowLeft, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const generalInductionSchema = z.object({
  lifeSavingRules: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the Life Saving Rules",
  }),
  fireAssemblyPoints: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge fire assembly points and escape routes",
  }),
  wasteManagement: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge waste management and welfare facilities",
  }),
  spillEquipment: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge spill equipment locations",
  }),
  firstAider: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge nearest first aider location",
  }),
  restrictedAreas: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge restricted areas and PPE requirements",
  }),
  housekeeping: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge housekeeping requirements",
  }),
  workplaceHazards: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge workplace hazards",
  }),
  procedures: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge site procedures and risk assessments",
  }),
  hocCards: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge HOC cards location",
  }),
  parking: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge parking and speed limit rules",
  }),
  coshh: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge COSHH requirements",
  }),
  smoking: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge smoking policy",
  }),
})

export default function GeneralInductionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof generalInductionSchema>>({
    resolver: zodResolver(generalInductionSchema),
    defaultValues: {
      lifeSavingRules: false,
      fireAssemblyPoints: false,
      wasteManagement: false,
      spillEquipment: false,
      firstAider: false,
      restrictedAreas: false,
      housekeeping: false,
      workplaceHazards: false,
      procedures: false,
      hocCards: false,
      parking: false,
      coshh: false,
      smoking: false,
    },
  })

  function onSubmit(values: z.infer<typeof generalInductionSchema>) {
    setIsSubmitting(true)
    localStorage.setItem("generalInduction", JSON.stringify(values))
    router.push("/form/workshop-specific")
  }

  function goBack() {
    router.push("/form/emergency-contact")
  }

  return (
    <div className="space-y-8">
      <FormProgress currentStep={3} totalSteps={6} />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">General Safety Induction</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Please confirm that you understand and acknowledge each of the following safety requirements. These are
          essential for maintaining a safe working environment at Fugro.
        </p>
      </div>

      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary">
          <strong>Important:</strong> All items must be acknowledged before proceeding. If you don't understand any
          point, please seek advice from a relevant team member.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
              General Safety Requirements
            </h3>

            <FormField
              control={form.control}
              name="lifeSavingRules"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-2 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I have been made aware of Fugro Life Saving Rules and understand their importance for workplace
                      safety.
                    </FormLabel>
                    <div className="flex items-center space-x-2 text-xs text-primary">
                      <ExternalLink className="h-3 w-3" />
                      <a
                        href="https://fugro.sharepoint.com/:b:/r/sites/InsiteFiles/HSSE%20Library/FNV-HSSE-LSR%20-%20Fugro%20LSR%20booklet%20Feb%202020%20A6.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        View Life Saving Rules
                      </a>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fireAssemblyPoints"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I have been shown the fire assembly points, nearest exits, and escape routes. I understand that
                      fire alarm tests are held on Fridays and red "break glass" fire call points are located at all
                      fire exits.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wasteManagement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of the location of site-specific waste management and welfare facilities including
                      canteen, toilets, etc.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spillEquipment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of the location of site-specific spill equipment and who to contact if an incident
                      occurs.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstAider"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of the nearest first aider. If First Aid assistance is required, I will contact
                      reception by dialling "7500" and report to the QHSSE department.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="restrictedAreas"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of areas that are out of bounds and which areas require PPE (e.g., Wash Bay) including
                      what specific PPE must be worn.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="housekeeping"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I understand that floor areas must be kept clear, no items left on walkways, items stacked safely
                      on racking, and the area must be left tidy after use.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workplaceHazards"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I have had workplace specific hazards explained to me (e.g., overhead crane, forklift operation,
                      high voltage, rotating machinery) and have been informed of potential hazards from other ongoing
                      operations.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="procedures"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of all site-specific procedures, processes, working practices, energy saving
                      initiatives and Risk Assessments which must be followed.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hocCards"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of the nearest location of the HOC cards.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of reverse parking requirements and the 5-mile speed limit within the car park.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coshh"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware of COSHH (Control of Substances Hazardous to Health) requirements when working with
                      chemicals.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smoking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none flex-1">
                    <FormLabel className="text-sm font-medium leading-relaxed">
                      I am aware that smoking is only allowed in the designated smoking area.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Emergency Contact
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 px-8">
              {isSubmitting ? "Saving..." : "Continue to Workshop Requirements"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
