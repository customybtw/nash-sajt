const stats = [
  { value: '120+', label: 'Websites launched' },
  { value: '96%', label: 'Client retention' },
  { value: '30%', label: 'Average conversion lift' },
  { value: '15 days', label: 'Median go-live timeline' },
];

const StatsBanner = () => (
  <section className="bg-white py-12">
    <div className="section-container grid gap-6 rounded-3xl border border-slate-200 bg-slate-50/80 px-6 py-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-display text-3xl font-semibold text-brand-600">{stat.value}</p>
          <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBanner;
