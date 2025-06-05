import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Fugro branding */}
      <header className="w-full bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Fugro Workshop Induction</h1>
                <p className="text-sm text-muted-foreground">Creating a safe working environment</p>
              </div>
            </div>
            <div className="cpt-mark w-4 h-4"></div>
          </div>
        </div>
      </header>

      <div className="container flex items-center justify-center min-h-[calc(100vh-120px)] py-8">
        <Card className="w-full max-w-4xl shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white">
            <CardTitle className="text-2xl text-center font-bold">Workshop Induction Form</CardTitle>
          </CardHeader>
          <CardContent className="p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
