import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function NotFound() { return <><Header /><main className="not-found shell"><span>404</span><h1>Металл нашли.<br />Страницу — нет.</h1><p>Вернитесь на главную или сразу перейдите к оценке лома.</p><div><Link className="button button--dark" href="/">На главную</Link><Link className="button button--accent" href="/otsenka">Оценить металл</Link></div></main><Footer /></>; }
