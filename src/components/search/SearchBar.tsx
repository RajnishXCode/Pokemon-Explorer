import { useSearchParams } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
}

export function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  return (
    <form action="" method="GET">
      <input
        type="search"
        name="q"
        defaultValue={query}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </form>
  )
} 