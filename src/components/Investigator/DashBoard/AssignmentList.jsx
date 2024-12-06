import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from 'lucide-react'

const assignments = [
  {
    title: "Colour Theory",
    date: "01 Sep 2022",
    completed: true,
    grade: "86/100",
  },
  {
    title: "Design system",
    date: "01 Sep 2022",
    completed: true,
    grade: "90/100",
  },
  {
    title: "User persona",
    date: "03 Sep 2022",
    completed: false,
    grade: "0/100",
  },
  {
    title: "Prototyping",
    date: "06 Sep 2022",
    completed: false,
    grade: "0/100",
  },
]

export function AssignmentsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments (12)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.title} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {assignment.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium leading-none">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.date}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{assignment.grade}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

