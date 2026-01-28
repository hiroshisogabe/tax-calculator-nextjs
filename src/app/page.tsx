import TaxForm from '@/components/TaxForm';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          TaxOrchestrator
        </h1>
        <p className="text-lg text-gray-600">
          Real-time tax calculation powered by Next.js Server Actions.
        </p>
      </div>

      <TaxForm />
    </main>
  );
}
