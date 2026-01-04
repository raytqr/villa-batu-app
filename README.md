# Villa Batu - Luxury Villa Booking Platform

![Villa Batu](https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200&h=400)

A premium villa booking platform tailored for "Calo" (Agents) in Batu City. Features a complete booking management system, profit tracking, and a stunning user interface.

## 🌟 Key Features

### For Guests
*   **Immersive Design:** Modern, responsive UI with glassmorphism and smooth animations.
*   **Smart Search:** Filter villas by date, price, pool, view type, and amenities.
*   **Dynamic Pricing:** Automatic price adjustments for Weekends and High Seasons.
*   **Easy Booking:** Seamless booking flow with direct WhatsApp integration.
*   **Comparison Tool:** Side-by-side villa comparison feature.
*   **Detail Rich:** Interactive maps, photo galleries, and genuine reviews.

### For Agents (Admin)
*   **Booking Management:** Complete dashboard to Track, ACC, or Cancel bookings.
*   **Profit System:** Automatic calculation of profit (Selling Price - Base Owner Price).
*   **Financial Reports:** Monthly revenue, cost, and profit reports with PDF and Excel export.
*   **Dynamic Availability:** Interactive calendar to manage booked dates.
*   **Content Management:** Full control over Villa details, photos, prices, and amenities.

## 🛠 Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Custom Design System (Batu Nature Palette)
*   **State Management:** Zustand (with Persistence)
*   **Icons:** Lucide React
*   **Maps:** Google Maps Embed API
*   **Date Handling:** date-fns

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/villa-batu.git
    cd villa-batu
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:3000`

## 💼 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── admin/        # Admin dashboard & management pages
│   ├── search/       # Search & Filter page
│   └── villa/        # Villa details page
├── components/       # Reusable UI components
├── lib/              # Utilities, types, and mock data
└── store/            # Zustand stores (Booking, Filter, Compare)
```

## 🎨 Design System

The platform uses a custom "Batu Nature" color palette inspired by the local pine forests:
*   **Pine:** Primary greens for branding and actions.
*   **Earth:** Accents for warmth and luxury.
*   **Fog:** Neutral grays for clean interfaces.
*   **Typography:** 'Playfair Display' for luxury headings, 'Inter' for clean functionality.

## 📝 License

This project is proprietary and built for internal use by Villa Batu agents.
