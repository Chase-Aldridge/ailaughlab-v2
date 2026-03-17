import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div>
        <h1 className="font-display font-bold text-[clamp(4rem,15vw,15vw)] leading-[0.85] text-text-primary">
          404
        </h1>
        <p className="mt-4 text-text-secondary text-lg">
          This experiment doesn't exist yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-accent hover:underline"
        >
          Back to the lab
        </Link>
      </div>
    </div>
  )
}
