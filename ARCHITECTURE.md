# ARCHITECTURE.md

# Bikinruang Digital Portfolio & Content Management System

## 1. Architecture Overview

Bikinruang Digital Portfolio & Content Management System adalah aplikasi web yang terdiri dari dua bagian utama:

1. **Public Website**
2. **Admin Content Management System**

Public Website digunakan untuk menampilkan identitas, layanan, portofolio, klien, dan konten perusahaan kepada publik.

Admin Content Management System digunakan oleh administrator atau editor untuk mengelola seluruh konten yang ditampilkan pada website.

Aplikasi menggunakan satu codebase berbasis Next.js dan terintegrasi dengan Supabase sebagai backend service.

Arsitektur dirancang dengan prinsip:

- Simple
- Maintainable
- Scalable
- Secure
- Performance-oriented
- Content-driven

---

# 2. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend Services

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage
- Supabase Row Level Security

## Validation

- Zod

## Deployment

- Vercel
- Supabase

---

# 3. High-Level Architecture

```text
                        USERS
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       PUBLIC VISITOR             ADMIN / EDITOR
              │                       │
              └───────────┬───────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   NEXT.JS APP   │
                │                 │
                │ PUBLIC + ADMIN  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ APPLICATION     │
                │ LAYER           │
                │                 │
                │ Server Actions  │
                │ Validation      │
                │ Authorization   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ DATA ACCESS     │
                │ LAYER           │
                │                 │
                │ Queries         │
                │ Supabase Client │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    SUPABASE     │
                │                 │
                │ PostgreSQL      │
                │ Authentication  │
                │ Storage         │
                │ RLS             │
                └─────────────────┘
```
