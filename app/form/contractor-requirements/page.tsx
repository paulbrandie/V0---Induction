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
import { Building2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const contractorRequirementsSchema = z.object({
  riskAssessments: z.boolean(),
  riskAssessmentsNA: z.boolean(),
  fugroDocuments: z.boolean(),
  fugroDocumentsNA: z.boolean(),
  asbestosRegister: z.boolean(),
  asbestosRegisterNA: z.boolean(),
  permitToWork: z.boolean(),
  permitToWorkNA: z.boolean(),
  additionalComments: z.string().optional(),
})

export default function ContractorRequirementsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof contractorRequirementsSchema>>({
    resolver: zodResolver(contractorRequirementsSchema),
    defaultValues: {
      riskAssessments: false,
      riskAssessmentsNA: false,
      fugroDocuments: false,
      fugroDocumentsNA: false,
      asbestosRegister: false,
      asbestosRegisterNA: false,
      permitToWork: false,
      permitToWorkNA: false,
      additionalComments: "",
    },
  })

  function onSubmit(values: z.infer<typeof contractorRequirementsSchema>) {
    setIsSubmitting(true)
    localStorage.setItem("contractorRequirements", JSON.stringify(values))
    router.push("/form/confirmation")
  }

  function goBack() {
    router.push("/form/workshop-specific")
  }

  const ContractorItem = ({
    name,
    naName,
    title,
    description,
  }: {
    name: keyof typeof contractorRequirementsSchema.shape
    naName: keyof typeof contractorRequirementsSchema.shape
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
      <FormProgress currentStep={5} totalSteps={6} />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 p-4 rounded-full">
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">3rd Party Contractor Requirements</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          These requirements apply specifically to external contractors. If you are a Fugro employee, you can mark all
          items as "N/A".
        </p>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Building2 className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>For Contractors:</strong> All documentation must be provided and approved before work can commence.
          Fugro procedures must be followed if contractor documentation is not available.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
              Contractor Documentation Requirements
            </h3>

            <ContractorItem
              name="riskAssessments"
              naName="riskAssessmentsNA"
              title="Risk Assessments and COSHH Assessments"
              description="Contractor has provided all appropriate Risk Assessment(s), COSHH assessments and/or safe method of work documentation"
            />

            <ContractorItem
              name="fugroDocuments"
              naName="fugroDocumentsNA"
              title="Fugro Risk Assessments and Procedures"
              description="If contractor paperwork is not available, Fugro Risk Assessments/procedures have been issued to, discussed with, and understood by contractor"
            />

            <ContractorItem
              name="asbestosRegister"
              naName="asbestosRegisterNA"
              title="Asbestos Register and Controls"
              description="If works are in an area containing Asbestos, contractor has been issued with and reviewed the Asbestos Register and appropriate controls are in place"
            />

            <ContractorItem
              name="permitToWork"
              naName="permitToWorkNA"
              title="Permit to Work"
              description="A Permit to Work has been raised, copy issued to contractor and copy posted at working area"
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
                    placeholder="Please add any additional contractor-specific requirements, documentation notes, or special conditions..."
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
              Back to Workshop Requirements
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 px-8">
              {isSubmitting ? "Saving..." : "Review & Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
