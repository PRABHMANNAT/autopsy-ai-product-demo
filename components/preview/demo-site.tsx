import { PLANS, PLAN_FEATURES } from "@/lib/demo-run";

/**
 * The staging product under test. Deliberately styled with plain nested CSS
 * rather than the app's own tokens, so it reads as a separate site.
 */
export function DemoSite() {
  return (
    // Fixed design width: the stage scrolls rather than reflowing the product,
    // so findings stay pinned to the same spot regardless of panel widths.
    <div className="min-h-full w-[860px] bg-[#fffaf2] text-[#1d120d]">
      <nav className="flex items-center justify-between border-b border-[#e8ded0] px-7 py-4">
        <span className="text-[19px] font-semibold tracking-[-0.03em]">
          northstar
        </span>
        <div className="flex items-center gap-6 text-[13.5px] text-[#514c46]">
          <button type="button" className="hover:text-[#1d120d]">
            Product
          </button>
          <button type="button" className="hover:text-[#1d120d]">
            Customers
          </button>
          <button
            type="button"
            className="border-b-[1.5px] border-[#1d120d] pb-[2px] text-[#1d120d]"
          >
            Pricing
          </button>
        </div>
        <button
          type="button"
          className="rounded-[10px] bg-[#1d120d] px-[18px] py-[10px] text-[13.5px] font-medium text-[#fffaf2]"
        >
          Start free
        </button>
      </nav>

      <section className="px-7 pb-2 pt-12 text-center">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#b4522a]">
          Pricing that scales with you
        </span>
        <h2 className="mx-auto mt-5 max-w-[13ch] text-[54px] font-semibold leading-[0.98] tracking-[-0.045em]">
          Choose how fast you want to grow.
        </h2>
        <p className="mt-5 text-[15px] text-[#514c46]">
          Start free. Upgrade when your team needs more.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-4 px-7 py-10">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-[14px] border bg-[#fffdf8] p-5 ${
              plan.featured
                ? "border-[1.5px] border-[#b4522a]"
                : "border-[#e2d8ca]"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-[11px] right-4 rounded-[6px] bg-[#b4522a] px-2 py-[4px] font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#fffaf2]">
                Popular
              </span>
            )}
            <h3 className="text-[19px] font-medium tracking-[-0.02em]">
              {plan.name}
            </h3>
            <p className="mt-[6px] text-[13px] leading-snug text-[#6b635b]">
              {plan.blurb}
            </p>
            <strong className="mt-5 block text-[34px] font-semibold tracking-[-0.04em]">
              {plan.price}
              <small className="text-[14px] font-normal text-[#6b635b]">
                /mo
              </small>
            </strong>
            <button
              type="button"
              className={`mt-4 w-full rounded-[10px] py-[11px] text-[13.5px] font-medium ${
                plan.featured
                  ? "bg-[#1d120d] text-[#fffaf2]"
                  : "border border-[#d8ccbc] bg-transparent text-[#1d120d]"
              }`}
            >
              {plan.cta}
            </button>
            <ul className="mt-5 flex flex-col gap-[9px] text-[12.5px] text-[#514c46]">
              {PLAN_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-[#185b3a]">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
