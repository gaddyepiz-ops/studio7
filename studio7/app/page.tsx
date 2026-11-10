import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/services";

export default async function Home() {
  const services = await getServices();

  return (
    <>
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold">Studio 7 Miami</span>
          <nav className="flex gap-6 text-sm">
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <Link href="/login" className="hover:underline">Log in</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-6 py-24">
          <h1 className="max-w-2xl text-5xl font-bold leading-tight">
            Creative production, made in Miami.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            Photo, video and podcast production for brands that want to look
            their best.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
          >
            Book a session
          </a>
        </section>

        <section id="services" className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold">Services</h2>
            {services.length === 0 && (
              <p className="mt-8 text-neutral-600">Services are loading. Please check back soon.</p>
            )}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-neutral-600">
            Booking will go here in a later step.
          </p>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        © 2026 Studio 7 Miami
      </footer>
    </>
  );
}
