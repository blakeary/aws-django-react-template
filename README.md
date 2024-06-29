# Project Template for React + Django Authentication

This project is a template for setting up a React frontend with a Django backend, including authentication features such as registration, email verification, password reset, and more. The project uses Docker for containerization, ensuring a smooth development and deployment process.

## Prerequisites

- Node.js (for the frontend)
- Python 3.11 (for the backend)
- Docker and Docker Compose

## Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name/backend
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and populate it with your configuration values (refer to the placeholders provided in the example).

5. **Apply migrations and create a superuser:**

   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

## Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Docker Setup

1. **Navigate to the root directory of the project:**

   ```bash
   cd ..
   ```

2. **Build and start the Docker containers:**
   ```bash
   docker-compose up --build
   ```

This command will build and start both the frontend and backend services along with any dependencies such as a Redis instance for Celery.

## Project Structure

```plaintext
.
├── backend
│   ├── core
│   ├── accounts
│   ├── ...
│   ├── requirements.txt
│   ├── Dockerfile
│   └── ...
├── frontend
│   ├── src
│   ├── public
│   ├── ...
│   ├── package.json
│   └── ...
├── docker-compose.yaml
└── README.md
```
