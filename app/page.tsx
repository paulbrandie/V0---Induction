import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
                <h1 className="text-2xl font-bold text-primary">Fugro</h1>
                <p className="text-sm text-muted-foreground">Unlocking insights from Geo-data</p>
              </div>
            </div>
            <div className="cpt-mark w-4 h-4"></div>
          </div>
        </div>
      </header>

      <div className="container flex items-center justify-center min-h-[calc(100vh-120px)] py-8">
        <Card className="w-full max-w-4xl shadow-lg border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold mb-2">Workshop Induction Form</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Complete this form to register for workshop access and ensure a safe working environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Fugro, our passionate people make the difference and are dedicated to creating a safe and liveable
                world. This comprehensive induction process ensures you have the knowledge and preparation needed for
                safe workshop access.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Safety First</h3>
                  <p className="text-sm text-muted-foreground">
                    Our commitment to safety ensures every team member returns home safely every day.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Expert Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Benefit from our decades of experience in creating safe working environments.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4 pb-8">
            <Link href="/form/personal-info">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                Begin Induction Process
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              By proceeding, you acknowledge that all information provided will be accurate and complete, supporting our
              commitment to workplace safety and excellence.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">Together we create a safe and liveable world</p>
        </div>
      </footer>
    </div>
  )
}
