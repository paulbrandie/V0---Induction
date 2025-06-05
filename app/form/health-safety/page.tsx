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

const healthSafetySchema = z.object({
  medicalConditions: z.boolean(),
  medicalDetails: z.string().optional(),
  safetyTraining: z.boolean(),
  ppeAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to wear appropriate PPE",
  }),
  emergencyProcedures: z.boolean().refine((val) => val === true, {
    message: "You must confirm understanding of emergency procedures",
  }),
})

export default function HealthSafetyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof healthSafetySchema>>({
    resolver: zodResolver(healthSafetySchema),
    defaultValues: {
      medicalConditions: false,
      medicalDetails: "",
      safetyTraining: false,
      ppeAgreement: false,
      emergencyProcedures: false,
    },
  })

  const watchMedicalConditions = form.watch("medicalConditions")

  function onSubmit(values: z.infer<typeof healthSafetySchema>) {
    setIsSubmitting(true)

    // Store the health and safety information
    localStorage.setItem("healthSafety", JSON.stringify(values))

    // Navigate to the next step
    router.push("/form/confirmation")
  }

  function goBack() {
    router.push("/form/emergency-contact")
  }

  return (
    <div className="space-y-6">
      <FormProgress currentStep={3} totalSteps={4} />

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Health & Safety</h2>
        <p className="text-muted-foreground">Important information for your workshop safety</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="medicalConditions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Do you have any medical conditions that we should be aware of?</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {watchMedicalConditions && (
            <FormField
              control={form.control}
              name="medicalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details of your medical condition</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe any medical conditions, allergies, or special requirements"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="safetyTraining"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Have you completed basic safety training before?</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ppeAgreement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to wear appropriate Personal Protective Equipment (PPE) at all times in the workshop
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyProcedures"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I confirm that I understand the emergency procedures and exit routes</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={goBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Next Step"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
