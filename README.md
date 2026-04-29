# Matjar (متجر) - Premium Ecommerce Platform

**Live Demo:** [matjar-ecommerce.vercel.app](https://matjar-ecommerce.vercel.app)

A modern, fully responsive, and bilingual (English & Arabic) ecommerce front-end application built with React. This project demonstrates a complete shopping flow with advanced state management, product filtering, and a sleek user interface using Tailwind CSS.

## 🌟 Features

* **Bilingual Support (RTL/LTR):** Seamlessly switch between English and Arabic. The entire layout automatically adapts to RTL for Arabic users.
* **Modern UI/UX:** Built with a premium aesthetic featuring dynamic glassmorphism navbars, smooth micro-animations, and a cohesive color palette.
* **Product Catalog:** Fetches and displays products from a real REST API with pagination.
* **Smart Category Filtering:** Filter products dynamically by categories through an intuitive scrollable chip bar.
* **Shopping Cart System:** Add to cart, adjust quantities, calculate subtotal, tax, and total. 
* **Wishlist (Favorites):** Save favorite products by clicking the heart icon. Wishlist data persists across sessions using `localStorage`.
* **Toast Notifications:** Non-intrusive, auto-dismissible slide-up toast notifications for user actions (e.g., adding to cart, removing from wishlist).
* **User Authentication Flow:** Fully functional login and registration UI with Formik/Yup validation. User sessions are simulated via `localStorage`.
* **Protected Routes:** Certain pages (like Checkout/Cart) require the user to be logged in, redirecting unauthenticated users safely.
* **Account Dashboard:** A user profile page showing account details and live statistics (cart and wishlist item counts).

## 🛠️ Tech Stack

* **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (for Cart and Wishlist slices)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Forms & Validation:** [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
* **HTTP Client:** [Axios](https://axios-http.com/) (fetching data from `dummyjson.com`)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mostafa-Khalifaa/matjar-ecommerce.git
   ```

2. Navigate to the project directory:
   ```bash
   cd matjar-ecommerce
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit: `http://localhost:5173`

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components (Navbar, Layout, ProtectedRoute, HeroBanner)
├── context/         # React Context providers (AuthContext, LanguageContext, ToastContext)
├── pages/           # Application route pages (Home, Cart, ProductDetails, Wishlist, Account, etc.)
├── redux/           # Redux Toolkit store and slices (Cart, Wishlist)
├── translations.js  # Bilingual text dictionaries (English/Arabic)
├── App.jsx          # Main Router component
└── main.jsx         # App entry point
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
