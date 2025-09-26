# CoinTrack - Personal Finance Dashboard 🫡

CoinTrack is a sleek and modern full-stack MERN application designed to help users take control of their finances. With a beautiful, animated user interface, it provides a seamless experience for tracking income and expenses, visualizing spending habits, and managing monthly recurring costs. This project was built from the ground up to showcase a complete range of modern web development skills.

---

## ✨ Features

* **Secure User Authentication:** Full user registration and login system using JWT (JSON Web Tokens) for secure, stateless authentication.
* **Full CRUD Operations:** Users can Create, Read, Update, and Delete their financial transactions.
* **Interactive Dashboard:** A central hub displaying key financial summaries, a list of recent transactions, and an interactive expense chart.
* **Multi-Currency Support:** Live currency conversion using the ExchangeRate-API. Users can view their entire financial picture in any currency, and the selection is saved across sessions.
* **Recurring Expense Management:** Users can save common monthly expenses (like rent or subscriptions) and apply them to the current month's transactions with a single click.
* **Data Visualization:** An elegant pie chart provides a clear and immediate breakdown of expenses by category.
* **Stunning UI/UX:** Built with Tailwind CSS and Framer Motion, the application features a modern, responsive design with smooth animations and a beautiful "space" theme for an engaging user experience.
* **Professional State Management:** Uses Redux Toolkit for predictable and scalable state management across the entire application.

---

## 🛠️ Tech Stack

### Frontend:

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A lightning-fast frontend build tool.
* **Redux Toolkit:** The standard for efficient and predictable state management.
* **React Router:** For client-side routing and navigation.
* **Tailwind CSS:** For utility-first styling and a beautiful, responsive design.
* **Framer Motion:** For fluid, declarative animations.
* **Axios:** For making HTTP requests to the backend API.
* **Chart.js:** For creating beautiful and interactive data visualizations.

### Backend:

* **Node.js:** A JavaScript runtime for the server.
* **Express:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL database for storing application data, accessed via Mongoose.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
* **JWT (jsonwebtoken):** For creating and verifying secure access tokens.
* **bcryptjs:** For hashing user passwords before storing them.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (which includes npm) installed on your machine.
* A MongoDB Atlas account (or a local MongoDB instance).
* An API key from ExchangeRate-API.com.

### Installation & Setup

**Clone the repo:**

```bash
git clone https://github.com/YOUR_USERNAME/cointrack.git
cd cointrack
```

**Backend Setup:**

```bash
cd server
npm install
```

Create a `.env` file in the server directory and add your secret keys:

```
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SUPER_SECRET_KEY
EXCHANGE_RATE_API_KEY=YOUR_EXCHANGERATEAPI_KEY
```

Start the backend server:

```bash
npm run dev
```

The server will be running on `http://localhost:5001`

**Frontend Setup:**

```bash
cd client
npm install
npm run dev
```

The app will open in your browser at `http://localhost:5173` (or another available port).
