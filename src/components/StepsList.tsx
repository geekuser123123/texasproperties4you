export function StepsList({ steps }: { steps: { title: string; description?: string }[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className="bg-white rounded-[10px] border border-brand-sand p-6">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white font-heading font-semibold mb-3">
            {i + 1}
          </span>
          <h3 className="font-heading text-lg font-semibold mb-1">{step.title}</h3>
          {step.description && <p className="text-[15px] text-brand-gray leading-relaxed">{step.description}</p>}
        </li>
      ))}
    </ol>
  );
}
