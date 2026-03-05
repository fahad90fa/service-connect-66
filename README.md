# ServiceHub - On-Demand Service Application

## Project Overview

ServiceHub is a full-stack on-demand service application (similar to Urban Company) where users can browse, book, and track home services. The platform supports three roles: **User**, **Service Provider**, and **Admin**.

This Lovable project serves as **UI prototype and design reference** for the React Native mobile app and Next.js admin panel.

## Live Prototype Pages

### User App (Mobile-Responsive)
| Route | Description |
|---|---|
| `/` | Home - categories, popular services, promo banner |
| `/services` | Browse all services with search & category filters |
| `/services/:id` | Service detail with date/time booking |
| `/bookings` | Booking history with status tabs |
| `/profile` | User profile & settings |
| `/login` | Sign up / Sign in |

### Admin Panel (Desktop)
| Route | Description |
|---|---|
| `/admin` | Dashboard with stats, revenue chart, booking breakdown |
| `/admin/users` | User management with role filters |
| `/admin/services` | Service catalog management |
| `/admin/bookings` | Booking management with status updates |

## Tech Stack

### This Prototype
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Recharts (admin charts)
- React Router DOM

### Recommended Production Stack
| Layer | Technology |
|---|---|
| Mobile App | React Native + TypeScript |
| Admin Panel | Next.js + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Database | MySQL + Sequelize ORM |
| State Mgmt | React Query (TanStack Query) |
| Auth | JWT + bcrypt |

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User roles (separate table for security)
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role ENUM('user', 'provider', 'admin') NOT NULL DEFAULT 'user',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_role (user_id, role)
);

-- Service categories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(50),
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Provider-service mapping
CREATE TABLE provider_services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  provider_id INT NOT NULL,
  service_id INT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE KEY unique_provider_service (provider_id, service_id)
);

-- Bookings
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  service_id INT NOT NULL,
  provider_id INT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  address TEXT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (provider_id) REFERENCES users(id)
);

-- Reviews
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  provider_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (provider_id) REFERENCES users(id)
);

-- Payments (mocked)
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('card', 'upi', 'wallet', 'cash') DEFAULT 'card',
  status ENUM('pending', 'completed', 'refunded', 'failed') DEFAULT 'pending',
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

---

## API Design

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/auth/refresh` | Refresh token |
| GET | `/api/auth/me` | Get current user |

### Users (Admin)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user details |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Deactivate user |
| PUT | `/api/users/:id/role` | Update role |

### Services
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | List (filterable) |
| GET | `/api/services/:id` | Details |
| POST | `/api/services` | Create (admin) |
| PUT | `/api/services/:id` | Update (admin) |
| DELETE | `/api/services/:id` | Delete (admin) |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bookings` | List (role-filtered) |
| POST | `/api/bookings` | Create (user) |
| PUT | `/api/bookings/:id/status` | Update status |
| PUT | `/api/bookings/:id/assign` | Assign provider |

### Provider
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/provider/jobs` | List assigned jobs |
| PUT | `/api/provider/jobs/:id/accept` | Accept job |
| PUT | `/api/provider/jobs/:id/reject` | Reject job |

---

## Folder Structure (Recommended)

```
project-root/
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   └── package.json
├── admin-panel/       # Next.js
│   ├── src/app/
│   ├── src/components/
│   └── package.json
├── mobile-app/        # React Native
│   ├── src/screens/
│   ├── src/components/
│   ├── src/navigation/
│   └── package.json
└── README.md
```

## Sample Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@servicehub.com | admin123 |
| User | alex@example.com | user123 |
| Provider | sarah@example.com | provider123 |

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
