import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  ctaHref?: string;
  ctaLabel?: string;
  index?: string;
};

export function PageHero({ eyebrow, title, accent, lead, ctaHref = "/otsenka", ctaLabel = "Получить оценку", index = "VM / 2026" }: Props) {
  return (
    <section className="page-hero shell">
      <div className="page-hero__index">{index}</div>
      <div className="page-hero__main">
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}{accent ? <><br /><em>{accent}</em></> : null}</h1>
      </div>
      <div className="page-hero__side">
        <p>{lead}</p>
        <Link className="button button--accent" href={ctaHref}>{ctaLabel} <span>↗</span></Link>
      </div>
    </section>
  );
}
