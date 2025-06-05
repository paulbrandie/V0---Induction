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
import { User, Mail, Phone } from "lucide-react"

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  workDuration: z.string().min(1, { message: "Work duration is required." }),
})

export default function PersonalInfoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      workDuration: "",
    },
  })

  function onSubmit(values: z.infer<typeof personalInfoSchema>) {
    setIsSubmitting(true)

    localStorage.setItem("personalInfo", JSON.stringify(values))
    router.push("/form/emergency-contact")
  }

  return (
    <div className="space-y-8">
      <FormProgress currentStep={1} totalSteps={4} />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Personal Information</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We need your personal details to ensure proper identification and communication throughout the induction
          process.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold">First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" className="border-2 focus:border-primary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold">Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" className="border-2 focus:border-primary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@company.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" className="border-2 focus:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">Duration of Work *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 1 day, 1 week, ongoing"
                    className="border-2 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Privacy Notice:</strong> Your personal information is collected in accordance with Fugro's privacy
              policy and will be used solely for workshop induction and safety purposes.
            </p>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 px-8 py-3">
              {isSubmitting ? "Saving..." : "Continue to Emergency Contact"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
