import { Helmet } from 'react-helmet-async';

const TermsPage = () => (
  <div className="bg-white">
    <Helmet>
      <title>Terms & Conditions | Nash Studio</title>
      <meta name="description" content="Review the service agreement, payment terms, and delivery policies for Nash Studio." />
    </Helmet>
    <section className="section-container prose prose-slate max-w-4xl py-20">
      <h1>Terms & Conditions</h1>
      <p>
        These terms cover the services provided by Nash Studio (“we”, “us”, “our”) to clients (“you”).
        By engaging with us you agree to the following conditions.
      </p>
      <h2>Scope of work</h2>
      <p>
        Each project includes a detailed statement of work defining deliverables, milestones, and
        responsibilities. Requests outside of scope may require a change order or additional sprint.
      </p>
      <h2>Payments</h2>
      <p>
        Subscription plans are billed monthly in advance. Project-based engagements require a 50%
        deposit with the remainder due prior to launch.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Upon full payment you own all custom assets created for your project, including design files,
        code, and content. We reserve the right to showcase the work in our portfolio.
      </p>
      <h2>Support</h2>
      <p>
        Active subscriptions include ongoing maintenance, bug fixes, and reasonable content updates.
        Response times are outlined in your service level agreement.
      </p>
    </section>
  </div>
);

export default TermsPage;
