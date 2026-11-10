type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
};

export default function ServiceCard({ title, description, price }: ServiceCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 p-6 transition hover:-translate-y-1 hover:border-neutral-900">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-600">{description}</p>
      <p className="mt-4 text-sm font-medium">{price}</p>
    </article>
  );
}
