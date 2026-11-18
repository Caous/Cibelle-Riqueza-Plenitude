# Riqueza & Plenitude — site da mentoria

- `site-riqueza-plenitude.pen`: design no Pencil (home + roteiro de scroll).
- `docs/00-descoberta-e-conceito.md`: briefing resumido, restrições, conceito, pontos a confirmar.
- `site/`: Vite + React + GSAP ScrollTrigger + Lenis.
- `assets-src/`: renders originais (fora do git).

## Rodar

```powershell
cd site
npm install
npm run dev
npm run build
```

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `VITE_CTA_URL` | Destino dos botões (ex.: link do WhatsApp). Sem ela, os botões rolam até a seção de investimento. |

## Imagens

- `public/img/cofre.webp`: render do cofrinho (gerado por IA, fundo recortado).
- `familia.webp`, `casal-maos.webp`, `horizonte.webp`: imagens editoriais geradas por IA, ilustrativas. Trocar por fotos licenciadas ou da cliente se preferir.

## Pendências da cliente

Foto da Cibelle, depoimentos autorizados, URL de contato/checkout, texto legal revisado, parcelas/datas/vagas (não exibidos).

## Animação

`prefers-reduced-motion`: sem Lenis nem ScrollTrigger; conteúdo todo estático e legível. Celular: sem pin horizontal; cofre fica fixo no topo enquanto os módulos rolam.
