# 🚗 Car Wash Booking Platform

A high-performance, frontend-focused web application designed to streamline vehicle service bookings. This project demonstrates advanced state management, asset optimization, and a persistent "cart" experience without requiring a backend server.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Local Storage](https://img.shields.io/badge/Data-Local_Storage-orange?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

## 🌟 Key Features

* **🛒 Persistent Cart Architecture:** Utilizes browser **Local Storage** to persist user state (selected services, vehicle type, and booking slot) across sessions, ensuring data survives page refreshes.
* **📂 Dynamic Service Catalog:** Scalable data structure rendering complex service hierarchies (Steam Wash, Detailing, Ceramic Coating) from efficient JSON files.
* **⚡ Media & Asset Optimization:**
    * **Cloudinary CDN:** Offloaded high-resolution marketing assets to Cloudinary to prevent GitHub file-size bloat and ensure fast LCP (Largest Contentful Paint).
    * **YouTube Embeds:** Replaced heavy local video files with optimized `<iframe>` embeds to reduce bundle size and improve Time to Interactive (TTI).
* **🎨 Responsive "Electric Blue" UI:** A custom-designed interface featuring glassmorphism effects, mobile-first Grid layouts, and smooth CSS transitions.

## 🛠️ Tech Stack

* **Frontend Engine:** React.js + Vite (for ultra-fast HMR)
* **State Management:** React Hooks (`useState`, `useEffect`) + Local Storage API
* **Asset Management:** Cloudinary (Images), YouTube (Video)
* **Styling:** Modern CSS3 (Flexbox, CSS Grid, CSS Variables)

## 🚀 Getting Started

This project is built with Vite and requires no backend setup. You can run it immediately:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/lekhan-03/Car-Wash-Platform.git]
    ```

2.  **Navigate to the project directory**
    ```bash
    cd Car-Wash-Platform
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🔮 Future Roadmap

* **Backend Migration:** Migrate data persistence from Local Storage to a Node.js/PostgreSQL backend.
* **User Authentication:** Implement JWT-based login for user profiles and order history.
* **Payment Integration:** Connect Razorpay or Stripe API for real-time checkout.

---

*Developed by Lekhan. This project showcases proficiency in Frontend Architecture, React Performance Optimization, and System Design.*
