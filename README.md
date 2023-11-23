# Funko Pop E-commerce Project

This is a full-stack e-commerce website for Funko Pop figures. It features user authentication with NextAuth, a shopping cart, and PayPal API for payments. The site also includes a dashboard with admin and super admin roles. Super admins can create, edit, or delete data on the website, while admins can only view data.

## Installation and Usage

### Frontend
1. Clone the repository and navigate to the frontend directory:
    ```bash
    git clone https://github.com/ArielValdes00/ecommerce-funkos.git
    cd client
    ```
2. Install the dependencies and start the development server:
    ```bash
    npm install
    npm run dev
    ```

### Backend
1. Navigate to the backend directory:
    ```bash
    cd server
    ```
2. Install the dependencies and start the development server:
    ```bash
    npm install
    npm run dev
    ```

### Environment Variables
You need to create a `.env` file in both the frontend and backend directories and fill in the following variables:

## Frontend
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_value
GOOGLE_CLIENT_SECRET=your_value
NEXTAUTH_SECRET=your_value
NEXT_PUBLIC_NEXTAUTH_URL=your_value
NEXT_PUBLIC_API_URL=your_value
NEXT_PUBLIC_SERVICE_ID=your_value
eNEXT_PUBLIC_TEMPLATE_ID=your_value
NEXT_PUBLIC_PUBLIC_KEY=your_value
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_value
NEXT_PUBLIC_DATABASE_URL=your_value
```
## Backend
```bash
CLOUDINARY_NAME=your_value
CLOUDINARY_API_KEY=your_value
CLOUDINARY_API_SECRET=your_value
JWT_SECRET=your_value
PAYPAL_API_KEY=your_value
PAYPAL_SECRET_KEY=your_value
PAYPAL_API=your_value
PORT=your_value
DB_USER=your_value
DB_PASSWORD=your_value
DB_NAME=your_value
DB_PORT=your_value
DATABASE_URL=your_value
EMAIL_USER=your_value
EMAIL_PASSWORD=your_value
APP_URL=your_value
```

