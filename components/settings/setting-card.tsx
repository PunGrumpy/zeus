import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface SettingsCardProps {
  title: string
  description: string
  children: React.ReactNode
}

export function SettingsCard({
  title,
  description,
  children
}: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
