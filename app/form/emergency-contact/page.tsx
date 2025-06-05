"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormProgress } from "@/components/form-progress"
import { Phone, Users, ArrowLeft } from "lucide-react"

const emergencyContactSchema = z.object({
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  relationship: z.string().min(2, { message: "Relationship must be at least 2 characters." }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
})

export default function EmergencyContactPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof emergencyContactSchema>>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      contactName: "",
      relationship: "",
      contactPhone: "",
      contactEmail: "",
    },
  })

  function onSubmit(values: z.infer<typeof emergencyContactSchema>) {
    setIsSubmitting(true)
    localStorage.setItem("emergencyContact", JSON.stringify(values))
    router.push("/form/general-induction")
  }

  function goBack() {
    router.push("/form/personal-info")
  }

  return (
    <div className="space-y-8">
      <FormProgress currentStep={2} totalSteps={4} />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Users className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Emergency Contact Information</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Safety is our top priority. Please provide emergency contact details so we can reach someone important to you
          if needed.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Emergency Contact Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full name of emergency contact"
                    className="border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Relationship to You *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Spouse, Parent, Sibling, Friend"
                    className="border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Emergency Contact Phone Number *
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Emergency Contact Email (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="emergency.contact@email.com"
                    className="border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> This contact will only be reached in case of a workplace emergency. Please
              ensure the information is current and the person is aware they are listed as your emergency contact.
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Personal Info
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 px-8">
              {isSubmitting ? "Saving..." : "Continue to Health & Safety"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
