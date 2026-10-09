const root = document.documentElement;
const motion = root.classList.contains('motion');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// Menu no celular
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');
if (toggle && nav) {
  const label = toggle.querySelector('.sr-only');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    label.textContent = open ? 'Fechar menu' : 'Abrir menu';
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
}

// Jornal: a data da capa acompanha o mês corrente, em duas linhas ("outubro / de 2026")
document.querySelectorAll('.data-hoje').forEach((el) => {
  const hoje = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  el.dateTime = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}`;
  const mes = hoje.toLocaleDateString('pt-BR', { month: 'long' });
  el.replaceChildren(mes, document.createElement('br'), `de ${hoje.getFullYear()}`);
});

// Fontes do rodapé (iguais às do site AUVP Capital): só carregam quando o rodapé se aproxima,
// para não disputar banda com a capa no carregamento
const rodape = document.querySelector('.site-footer');
if (rodape) {
  const carregaFontes = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Anek+Latin:wght@600&family=Roboto:wght@500&family=Sora:wght@400&display=swap';
    document.head.append(link);
  };
  const fio = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    fio.disconnect();
    carregaFontes();
  }, { rootMargin: '1200px 0px' });
  fio.observe(rodape);
}

// Cabeçalho: transparente sobre a capa, sólido quando a capa sai
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');

// Título da capa: envolve cada palavra para a subida. O texto continua o mesmo para leitores e buscadores.
if (motion) {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const w = document.createElement('span');
      w.className = 'w';
      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.setProperty('--i', i);
      w.append(inner);
      el.append(w, i < words.length - 1 ? ' ' : '');
    });
  });
}

// Revelação ao rolar (uma vez por elemento)
if (motion) {
  document.querySelectorAll('[data-reveal-group]').forEach((g) => {
    [...g.children].forEach((c, i) => c.style.setProperty('--d', i));
  });
  document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => el.style.setProperty('--d', 2 + i));
  document.querySelectorAll('.seis-dots .pessoa.on').forEach((d, i) => d.style.setProperty('--k', i));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  document.querySelectorAll('[data-reveal], [data-reveal-group], .pg').forEach((el) => {
    // a capa revela já no carregamento, em sequência com o título
    if (el.closest('.hero')) requestAnimationFrame(() => el.classList.add('is-in'));
    else io.observe(el);
  });
  // ao imprimir, mostra tudo
  window.addEventListener('beforeprint', () => document.querySelectorAll('[data-reveal], [data-reveal-group], .nota, .pg')
    .forEach((el) => el.classList.add('is-in')));
}

// Dados: cada linha dispara sozinha quando aparece inteira na tela; conta de 0 ao valor e a barra enche junto
if (motion) {
  const rows = [...document.querySelectorAll('.bar-row')];
  let queue = 0;
  const run = (row, delay) => {
    const num = row.querySelector('[data-count]');
    const target = Number(num.dataset.count);
    const dur = 1600;
    setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const q = 1 - Math.pow(1 - clamp((now - start) / dur), 4);
        row.style.setProperty('--q', q.toFixed(4));
        num.textContent = `${Math.round(target * q)}%`;
        if (q < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
  };
  rows.forEach((row) => {
    row.style.setProperty('--q', '0');
    row.querySelector('[data-count]').textContent = '0%';
  });
  const bio = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      bio.unobserve(e.target);
      run(e.target, queue++ * 220);
      setTimeout(() => { queue = Math.max(0, queue - 1); }, 220);
    });
  }, { threshold: 0.9, rootMargin: '0px 0px -8% 0px' });
  rows.forEach((row) => bio.observe(row));
  window.addEventListener('beforeprint', () => rows.forEach((row) => {
    row.style.setProperty('--q', '1');
    const num = row.querySelector('[data-count]');
    num.textContent = `${num.dataset.count}%`;
  }));
}

// Fecho dos dados: a sequência dispara quando a frase aparece quase inteira
const fecho = document.querySelector('.dados-fecho');
if (motion && fecho) {
  const fio = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    fio.disconnect();
    fecho.classList.add('is-on');
  }, { threshold: 0.7 });
  fio.observe(fecho);
  window.addEventListener('beforeprint', () => fecho.classList.add('is-on'));
}

// Escolas: a cortina da foto só abre quando a imagem já carregou e a foto está bem visível
if (motion) {
  const pronta = (img) => (img.complete && img.naturalWidth
    ? Promise.resolve()
    : new Promise((res) => {
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    })).then(() => (img.decode ? img.decode().catch(() => {}) : undefined));
  const eio = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      eio.unobserve(e.target);
      const img = e.target.querySelector('img');
      img.loading = 'eager';
      pronta(img).then(() => requestAnimationFrame(() => e.target.classList.add('is-shown')));
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.escola-foto').forEach((f) => eio.observe(f));
  window.addEventListener('beforeprint', () => document.querySelectorAll('.escola-foto').forEach((f) => f.classList.add('is-shown')));
}

// Pilha na mesa: quando a dobra entra na tela, as decisões caem sozinhas, uma de cada vez
const pilha = document.querySelector('.pilha');
if (motion && pilha) {
  const notas = [...pilha.querySelectorAll('.nota')];
  const pilhaN = pilha.querySelector('.pilha-n');
  const pio = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    pio.disconnect();
    notas.forEach((n, i) => setTimeout(() => {
      n.classList.add('is-in');
      pilhaN.textContent = i + 1;
    }, 250 + i * 520));
    setTimeout(() => pilha.classList.add('is-done'), 250 + notas.length * 520 + 700);
  }, { threshold: 0.35 });
  pio.observe(pilha.querySelector('.notas'));
  window.addEventListener('beforeprint', () => pilha.classList.add('is-done'));
}

// ---------- Motor de rolagem: capa, cabeçalho, paralaxe e jornal ----------

const progressBar = document.querySelector('.scroll-progress span');
const heroMedia = document.querySelector('.hero-media');
const heroCopy = document.querySelector('.hero-copy');
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];


const track = document.querySelector('.flip-track');
const book = document.querySelector('.book');
const sheets = [...document.querySelectorAll('.sheet')];
const desktopStage = matchMedia('(min-width: 960px) and (min-height: 620px)');


// progresso 0..1 de um trilho com palco fixo
function trackProgress(el) {
  const r = el.getBoundingClientRect();
  const total = r.height - innerHeight;
  return total > 0 ? clamp(-r.top / total) : 0;
}

function onScroll() {
  const vh = innerHeight;

  // filete de progresso da leitura
  if (progressBar) {
    const max = document.documentElement.scrollHeight - vh;
    progressBar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max) : 0})`;
  }

  // cabeçalho
  if (header && hero) {
    header.classList.toggle('is-solid', hero.getBoundingClientRect().bottom <= header.offsetHeight + 1);
  }
  if (!motion) return;

  // capa: foto e recorte descem e crescem juntos; o texto se dissolve
  if (hero) {
    const p = clamp(scrollY / hero.offsetHeight);
    heroMedia.style.transform = `translate3d(0, ${p * 56}px, 0) scale(${1 + p * 0.12})`;
    heroCopy.style.opacity = String(1 - clamp(p * 1.6));
    heroCopy.style.transform = `translate3d(0, ${p * -48}px, 0)`;
  }

  // paralaxe leve nas fotos grandes
  parallaxEls.forEach((img) => {
    const box = img.parentElement.getBoundingClientRect();
    if (box.bottom < 0 || box.top > vh) return;
    const offset = (box.top + box.height / 2 - vh / 2) * -Number(img.dataset.parallax);
    img.style.setProperty('--py', `${offset.toFixed(1)}px`);
  });

  // jornal (desktop): a folha pousa, depois cada folha vira pela lombada
  if (track && book && desktopStage.matches) {
    const t = trackProgress(track);
    book.style.setProperty('--land', easeOut(clamp(t / 0.1)).toFixed(3));
    const n = sheets.length;
    const flips = n - 1;
    const ps = sheets.map((sh, i) => {
      if (i >= flips) return 0;
      const a = 0.16 + i * 0.36;
      const p = clamp((t - a) / 0.26);
      return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    });
    // folha que está virando agora (a primeira que ainda não terminou)
    const k = ps.findIndex((p) => p < 1);
    sheets.forEach((sh, i) => {
      const p = ps[i];
      sh.style.setProperty('--p', p.toFixed(4));
      sh.style.setProperty('--shade', Math.sin(p * Math.PI).toFixed(3));
      // profundidade própria para cada folha: evita que duas páginas no mesmo plano se misturem
      sh.style.setProperty('--z', `${p < 0.5 ? -i * 2 : (i - n) * 2}px`);
      sh.style.zIndex = p < 0.5 ? String(n - i) : String(n + i);
      // ficam visíveis a folha que vira, a de baixo e a última já virada
      const visible = k === -1 ? i >= n - 2 : i >= k - 1 && i <= k + 1;
      sh.style.visibility = visible ? 'visible' : 'hidden';
    });
    book.style.setProperty('--open', ps[0].toFixed(4));
  }
}

let ticking = false;
const requestTick = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { onScroll(); ticking = false; });
};
addEventListener('scroll', requestTick, { passive: true });
addEventListener('resize', requestTick);
onScroll();

// ---------- Contagem regressiva até o dia do evento ----------
const countdown = document.querySelector('.countdown');
if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const cells = {
    d: countdown.querySelector('[data-unit="d"]'),
    h: countdown.querySelector('[data-unit="h"]'),
    m: countdown.querySelector('[data-unit="m"]'),
    s: countdown.querySelector('[data-unit="s"]'),
  };
  const pad = (v) => String(v).padStart(2, '0');
  const set = (el, value) => {
    if (el.textContent === value) return;
    el.textContent = value;
    if (motion) {
      el.classList.remove('tick');
      void el.offsetWidth; // reinicia a animação do dígito
      el.classList.add('tick');
    }
  };

  let timer;
  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    const sec = Math.floor(diff / 1000);
    set(cells.d, pad(Math.floor(sec / 86400)));
    set(cells.h, pad(Math.floor((sec % 86400) / 3600)));
    set(cells.m, pad(Math.floor((sec % 3600) / 60)));
    set(cells.s, pad(sec % 60));
    if (diff === 0) clearInterval(timer);
  };
  timer = setInterval(tick, 1000);
  tick();
}
