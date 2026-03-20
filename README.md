# Psylog Web

Klinik psikolog portföyü ve makale yayın platformu. Öğrenme ve portföy amacıyla geliştirilmiş fullstack bir uygulama.

## Tech Stack

**Frontend**

- Next.js 16 (App Router) + TypeScript
- Shadcn/ui · Tailwind CSS
- Inter + Lora (next/font)

**Backend** _(ayrı repo)_

- Spring Boot · Java · PostgreSQL
- JPA/Hibernate · JWT (httpOnly cookie)

## Sayfalar

| Alan   | Sayfalar                                 |
| ------ | ---------------------------------------- |
| Public | Home, About, Posts, Post Detail, Contact |
| Admin  | Login, Post List, Create Post, Edit Post |

## Kurulum

```bash
npm install
npm run dev
```

`.env.local` dosyası oluştur:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Klasör Yapısı

```
src/
├── app/
│   ├── (public)/       # public sayfa route grubu
│   ├── (admin)/        # admin route grubu
│   ├── layout.tsx      # root layout, font, metadata
│   └── globals.css
├── components/
│   ├── ui/             # shadcn primitifleri
│   └── *.tsx           # custom composite bileşenler
└── lib/
    ├── metadata.ts     # createMetadata() yardımcısı
    └── constants.ts    # nav linkleri, site sabitleri
```

## API

Backend base path: `/api`
Auth: JWT → `Set-Cookie: token; HttpOnly`
Tüm fetch çağrıları `credentials: 'include'` kullanır.

Detaylı endpoint listesi için: [`.claude/api-contract.md`](.claude/api-contract.md)
