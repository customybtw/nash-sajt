const steps = [
  {
    title: 'Discover & Strategize',
    description:
      'We map your goals, SEO opportunities, customer journey, and integrations before design begins.',
  },
  {
    title: 'Design & Prototype',
    description:
      'High-fidelity layouts, component library, and responsive prototypes ensure clarity before development.',
  },
  {
    title: 'Build & Integrate',
    description:
      'We develop the frontend, connect MySQL-powered admin tools, set up payment gateways, and automate workflows.',
  },
  {
    title: 'Launch & Grow',
    description:
      'Analytics, A/B testing, SEO reporting, and marketing sprints keep your digital presence evolving.',
  },
];

const ProcessTimeline = () => (
  <section className="section-container py-16">
    <div className="mb-12 text-center">
      <h2 className="font-display text-3xl font-semibold text-slate-900">A collaborative process</h2>
      <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
        From the first strategy call to the launch of your ecommerce or content hub, our process keeps
        you informed and empowered.
      </p>
    </div>
    <ol className="relative border-l border-brand-200 pl-6">
      {steps.map((step, index) => (
        <li key={step.title} className="mb-10 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            {index + 1}
          </span>
          <h3 className="font-display text-xl font-semibold text-slate-900">{step.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{step.description}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default ProcessTimeline;
