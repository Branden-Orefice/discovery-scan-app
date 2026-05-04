import { Badge } from '#/components/ui/badge'

const SeverityColorBadges = (label: string) => {
  const severity = label?.toLowerCase().trim() ?? 'unknown'
  switch (severity) {
    case 'critical':
      return (
        <Badge
          variant="destructive"
          className="border px-3 bg-red-600/10 text-red-600 focus-visible:ring-red-600/10 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 border-red-500/30"
        >
          Critical
        </Badge>
      )
    case 'high':
      return (
        <Badge
          variant="outline"
          className="border px-3 bg-orange-600/10 text-orange-600 focus-visible:ring-orange-600/10 focus-visible:outline-none dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 border-orange-500/30"
        >
          High
        </Badge>
      )
    case 'medium':
      return (
        <Badge
          variant="outline"
          className="border px-3 bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/10 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 border-yellow-500/30"
        >
          Medium
        </Badge>
      )
    case 'low':
      return (
        <Badge
          variant="outline"
          className="border px-3 bg-indigo-600/10 text-indigo-600 focus-visible:ring-indigo-600/10 focus-visible:outline-none dark:bg-indigo-400/10 dark:text-indigo-400 dark:focus-visible:ring-indigo-400/40 border-indigo-500/30"
        >
          Low
        </Badge>
      )
    case 'info':
      return (
        <Badge
          variant="outline"
          className="border px-3 bg-green-600/10 text-green-600 focus-visible:ring-green-600/10 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 border-green-500/30"
        >
          Info
        </Badge>
      )
    default:
      return (
        <Badge
          variant="outline"
          className="border px-3 bg-pink-600/10 text-pink-600 focus-visible:ring-pink-600/10 focus-visible:outline-none dark:bg-pink-400/10 dark:text-pink-400 dark:focus-visible:ring-pink-400/40 border-pink-500/30"
        >
          Unknown
        </Badge>
      )
  }
}

export default SeverityColorBadges
