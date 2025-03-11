# Store PERN Stack

## Overview
This is a full-stack e-commerce store built using the PERN stack (PostgreSQL, Express.js, React, Node.js). The application provides a complete shopping experience, including product listing, authentication, cart management, and checkout functionality.

## Features
- User authentication (JWT-based login/register)
- Product catalog with filtering and searching
- Shopping cart functionality
- Order management
- Admin panel for product and user management
- Responsive design

## Tech Stack
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Docker, Vercel (Frontend), Railway (Backend & Database)

## Installation & Setup
### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL installed and running
- Docker (optional for containerized deployment)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/iamyoussefezzat/store-pern_stack.git
   cd store-pern_stack
   ```

2. **Setup backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env # Update environment variables
   npm run migrate # Run database migrations
   npm start
   ```

3. **Setup frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token
- `GET /api/products` - Fetch all products
- `POST /api/orders` - Place an order
- ... and more!

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, reach out to [Youssef Ezzat](https://github.com/iamyoussefezzat).
