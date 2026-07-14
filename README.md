# 🛒 Fresh Cart — React E-Commerce App

> 🔗 **Live Demo:** [https://gehad-ahmed.github.io/Fresh-Card/](https://gehad-ahmed.github.io/Fresh-Card/)

A fully-featured e-commerce single-page application built with **React** and **Vite**, connected to a live REST API. Browse products, manage a cart and wishlist, authenticate, and complete a real checkout flow.

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

## 📖 Overview

Fresh Cart is a complete online-shopping experience. It consumes the **[Route E-Commerce API](https://ecommerce.routemisr.com)** for products, categories, brands, authentication, cart, wishlist and checkout, and uses **TanStack React Query** for efficient data fetching and caching.

## ✨ Features

- 🔐 **Authentication** — register, login, and forgot / reset password flow with robust form validation (Formik + Yup)
- 🛍️ **Product catalog** — product listing, detailed product pages, categories and brands
- 🔎 **Search & browse** — explore products by category and subcategory
- 🛒 **Shopping cart** — add items, update quantities, remove items, and live price totals
- ❤️ **Wishlist** — save and manage favorite products
- 💳 **Checkout** — online payment session (Stripe-style checkout via the API)
- 🔄 **Smart data layer** — caching, background refetching and loading states with React Query
- 📶 **Offline detection**, animated loaders, toast notifications and product carousels
- 📱 **Fully responsive** UI built with Tailwind CSS and Flowbite

## 🛠️ Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | React 18 + Vite |
| Routing | React Router DOM |
| Data fetching | TanStack React Query + Axios |
| Forms & validation | Formik + Yup |
| Styling | Tailwind CSS + Flowbite |
| UX | React Toastify, React Slick, React Loader Spinner, React Detect Offline |

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/gehad-ahmed/Fresh-Card.git
cd Fresh-Card

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## 🌐 API

This project is powered by the free **Route E-Commerce API**: `https://ecommerce.routemisr.com/api/v1`

## 👤 Author

**Gehad Ahmed** — Front-End Developer

- 🔗 GitHub: [@gehad-ahmed](https://github.com/gehad-ahmed)
- 💼 LinkedIn: [Gehad Ahmed](https://www.linkedin.com/in/gehad-ahmed-9a8351259/)
- 📧 Email: gehadAhmedEzz.96@gmail.com

---

<p align="center">Made with 💜 by Gehad Ahmed — ⭐ Star this repo if you found it useful!</p>
