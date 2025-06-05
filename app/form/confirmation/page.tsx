"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormProgress } from "@/components/form-progress"
import { Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    companyName: string
    workDuration: string
  }
  emergencyContact: {
    contactName: string
    relationship: string
    contactPhone: string
    contactEmail?: string
  }
  generalInduction: Record<string, boolean>
  workshopSpecific: Record<string, boolean | string>
  contractorRequirements: Record<string, boolean | string>
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}")
      const emergencyContact = JSON.parse(localStorage.getItem("emergencyContact") || "{}")
      const generalInduction = JSON.parse(localStorage.getItem("generalInduction") || "{}")
      const workshopSpecific = JSON.parse(localStorage.getItem("workshopSpecific") || "{}")
      const contractorRequirements = JSON.parse(localStorage.getItem("contractorRequirements") || "{}")

      if (!personalInfo.firstName || !emergencyContact.contactName) {
        setError("Some required information is missing. Please complete all previous steps.")
        return
      }

      setFormData({
        personalInfo,
        emergencyContact,
        generalInduction,
        workshopSpecific,
        contractorRequirements,
      })
    } catch (err) {
      setError("There was an error loading your form data. Please try again.")
    }
  }, [])

  function goBack() {
    router.push("/form/contractor-requirements")
  }

  async function handleSubmit() {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear all form data from localStorage after successful submission
      localStorage.removeItem("personalInfo")
      localStorage.removeItem("emergencyContact")
      localStorage.removeItem("generalInduction")
      localStorage.removeItem("workshopSpecific")
      localStorage.removeItem("contractorRequirements")

      setIsSubmitted(true)
    } catch (err) {
      setError("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleStartOver() {
    router.push("/")
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Submission Successful!</h2>
          <p className="mt-2 text-muted-foreground">Your workshop induction form has been submitted successfully.</p>
          <p className="mt-4">You will receive a confirmation email shortly with further instructions.</p>
          <Button onClick={handleStartOver} className="mt-6">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={handleStartOver}>Start Over</Button>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <FormProgress currentStep={6} totalSteps={6} />

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <p className="text-muted-foreground">Please review your information before submitting</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span> {formData.personalInfo.firstName}{" "}
              {formData.personalInfo.lastName}
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span> {formData.personalInfo.email}
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span> {formData.personalInfo.phone}
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span> {formData.emergencyContact.contactName}
            </div>
            <div>
              <span className="text-muted-foreground">Relationship:</span> {formData.emergencyContact.relationship}
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span> {formData.emergencyContact.contactPhone}
            </div>
            {formData.emergencyContact.contactEmail && (
              <div>
                <span className="text-muted-foreground">Email:</span> {formData.emergencyContact.contactEmail}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Company:</span> {formData.personalInfo.companyName}
            </div>
            <div>
              <span className="text-muted-foreground">Work Duration:</span> {formData.personalInfo.workDuration}
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">General Safety Induction</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">All safety requirements acknowledged and confirmed</span>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Workshop Requirements</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">Workshop-specific safety requirements completed</span>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Contractor Requirements</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">3rd party contractor requirements addressed</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={goBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
          {isSubmitting ? "Submitting..." : "Submit Induction Form"}
        </Button>
      </div>
    </div>
  )
}
