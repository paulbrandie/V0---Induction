"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { FormProgress } from "@/components/form-progress"
import { Wrench, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const workshopSpecificSchema = z.object({
  pressureSystems: z.boolean(),
  pressureSystemsNA: z.boolean(),
  liftingAppliances: z.boolean(),
  liftingAppliancesNA: z.boolean(),
  drillsRotatingMachines: z.boolean(),
  drillsRotatingMachinesNA: z.boolean(),
  portableElectricTools: z.boolean(),
  portableElectricToolsNA: z.boolean(),
  abrasiveWheels: z.boolean(),
  abrasiveWheelsNA: z.boolean(),
  weldingEquipment: z.boolean(),
  weldingEquipmentNA: z.boolean(),
  outOfHoursFamiliarisation: z.boolean(),
  outOfHoursFamiliarisationNA: z.boolean(),
  outOfHoursContact: z.boolean(),
  outOfHoursContactNA: z.boolean(),
  emergencyResponseProcedures: z.boolean(),
  emergencyResponseProceduresNA: z.boolean(),
  securityProcess: z.boolean(),
  securityProcessNA: z.boolean(),
  additionalComments: z.string().optional(),
})

export default function WorkshopSpecificPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof workshopSpecificSchema>>({
    resolver: zodResolver(workshopSpecificSchema),
    defaultValues: {
      pressureSystems: false,
      pressureSystemsNA: false,
      liftingAppliances: false,
      liftingAppliancesNA: false,
      drillsRotatingMachines: false,
      drillsRotatingMachinesNA: false,
      portableElectricTools: false,
      portableElectricToolsNA: false,
      abrasiveWheels: false,
      abrasiveWheelsNA: false,
      weldingEquipment: false,
      weldingEquipmentNA: false,
      outOfHoursFamiliarisation: false,
      outOfHoursFamiliarisationNA: false,
      outOfHoursContact: false,
      outOfHoursContactNA: false,
      emergencyResponseProcedures: false,
      emergencyResponseProceduresNA: false,
      securityProcess: false,
      securityProcessNA: false,
      additionalComments: "",
    },
  })

  function onSubmit(values: z.infer<typeof workshopSpecificSchema>) {
    setIsSubmitting(true)
    localStorage.setItem("workshopSpecific", JSON.stringify(values))
    router.push("/form/contractor-requirements")
  }

  function goBack() {
    router.push("/form/general-induction")
  }

  const WorkshopItem = ({
    name,
    naName,
    title,
    description,
  }: {
    name: keyof typeof workshopSpecificSchema.shape
    naName: keyof typeof workshopSpecificSchema.shape
    title: string
    description: string
  }) => (
    <div className="rounded-md border p-4 hover:bg-slate-50">
      <h4 className="font-medium text-primary mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex space-x-6">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-sm font-medium">Yes</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={naName}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-sm font-medium">N/A</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <FormProgress currentStep={4} totalSteps={6} />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full">
            <Wrench className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Workshop-Specific Requirements</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Please indicate which workshop activities are relevant to your work. Select "Yes" if you will be using this
          equipment or "N/A" if not applicable to your work.
        </p>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <Wrench className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Workshop Safety:</strong> Only check "Yes" for equipment you will actually be using. All equipment
          requires proper training and authorization before use.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
              Equipment and Systems
            </h3>

            <WorkshopItem
              name="pressureSystems"
              naName="pressureSystemsNA"
              title="Use of Pressure Systems"
              description="Start Up procedures, Electrical Safety, Hydraulic Safety, and required PPE"
            />

            <WorkshopItem
              name="liftingAppliances"
              naName="liftingAppliancesNA"
              title="Lifting Appliances"
              description="Forklifts, Wire Rope Handling, Shackles, Cranes, Chain/Soft Strop Maintenance, Hooks"
            />

            <WorkshopItem
              name="drillsRotatingMachines"
              naName="drillsRotatingMachinesNA"
              title="Drills & Other Rotating Machines"
              description="Authorization for use, required PPE, and Safety Rules"
            />

            <WorkshopItem
              name="portableElectricTools"
              naName="portableElectricToolsNA"
              title="Portable/Electric Tools"
              description="PAT Testing requirements and 2-Person Electrical Working procedures"
            />

            <WorkshopItem
              name="abrasiveWheels"
              naName="abrasiveWheelsNA"
              title="Use of Abrasive Wheels"
              description="Correct Guards, Wheel Changing procedures, Emergency Switches, PPE, and Procedures"
            />

            <WorkshopItem
              name="weldingEquipment"
              naName="weldingEquipmentNA"
              title="Use of Welding Equipment"
              description="Authorization from Base Manager, required PPE, and relevant procedures"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
              Out of Hours Work Requirements
            </h3>

            <WorkshopItem
              name="outOfHoursFamiliarisation"
              naName="outOfHoursFamiliarisationNA"
              title="Site Familiarisation for Out of Hours Work"
              description="Confirmed familiarisation with site layout and procedures for after-hours access"
            />

            <WorkshopItem
              name="outOfHoursContact"
              naName="outOfHoursContactNA"
              title="Point of Contact for Out of Hours"
              description="Emergency contact person provided for after-hours work situations"
            />

            <WorkshopItem
              name="emergencyResponseProcedures"
              naName="emergencyResponseProceduresNA"
              title="Emergency Response Procedures and Responsibilities"
              description="Known procedures for Fire, Spill, and First Aid emergencies during out of hours work"
            />

            <WorkshopItem
              name="securityProcess"
              naName="securityProcessNA"
              title="Security Process for Out of Hours"
              description="Access and egress procedures explained and confirmed for after-hours work"
            />
          </div>

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Additional Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please add any additional information, specific requirements, or comments about the workshop induction..."
                    className="min-h-[100px] border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to General Induction
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 px-8">
              {isSubmitting ? "Saving..." : "Continue to Contractor Requirements"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
