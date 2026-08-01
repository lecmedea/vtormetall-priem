import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders primary marketing routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const runtime = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const context = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    ["/", "Металл"],
    ["/ceny", "Цена"],
    ["/metally", "Что можно"],
    ["/metally/med", "медь"],
    ["/uslugi/vyvoz", "Вывоз"],
    ["/otsenka", "Hugging Face"],
    ["/kontakty", "Рябиновая"],
    ["/blog/kak-podgotovit-med", "подготовить медь"],
    ["/faq", "Короткие ответы"],
  ];
  for (const [path, expected] of routes) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), runtime, context);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(expected, "i"), path);
  }
});

test("keeps both phones and the application panel on every page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("shared-ui", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const runtime = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const context = { waitUntil() {}, passThroughOnException() {} };
  const routes = ["/", "/ceny", "/metally", "/metally/med", "/uslugi", "/uslugi/vyvoz", "/otsenka", "/kontakty", "/o-kompanii", "/blog", "/blog/kak-podgotovit-med", "/faq", "/dokumenty", "/politika"];

  for (const path of routes) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), runtime, context);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /id="site-application"/i, `${path} application panel`);
    assert.match(html, /\+7 999 996 22 06/i, `${path} first phone`);
    assert.match(html, /\+7 916 348 95 36/i, `${path} second phone`);
  }
});

test("renders the requested team, SEO story and grapple asset", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("requested-content", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const runtime = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };

  const home = await (await worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), runtime, context)).text();
  assert.match(home, /grapple-transparent\.webp/i);
  assert.match(home, /iconly-location\.svg/i);
  assert.match(home, /iconly-calling\.svg/i);
  assert.match(home, /iconly-camera\.svg/i);

  const about = await (await worker.fetch(new Request("http://localhost/o-kompanii", { headers: { accept: "text/html" } }), runtime, context)).text();
  assert.match(about, /Куфтов Ярослав/i);
  assert.match(about, /Сергей Бежаев/i);

  const prices = await (await worker.fetch(new Request("http://localhost/ceny", { headers: { accept: "text/html" } }), runtime, context)).text();
  assert.match(prices, /ломбард металлолома/i);
});

test("rejects an invalid lead before storage", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("form", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const form = new FormData();
  form.set("phone", "123");
  form.set("consent", "yes");
  const response = await worker.fetch(
    new Request("http://localhost/api/leads", { method: "POST", body: form }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 400);
});
