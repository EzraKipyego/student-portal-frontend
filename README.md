# Student Portal

A web-based student management system built with React and Django REST Framework. The application provides a centralized platform for managing students, courses, announcements, attendance, and payments through a simple and responsive interface.

## Features

### Students

* Secure user authentication
* View enrolled courses
* View grades
* View announcements
* Track attendance
* View timetable
* Pay school fees via M-Pesa (Safaricom Daraja STK Push)

### Administrators

* Manage students
* Manage courses
* Enroll students in courses
* Update student grades
* Create and manage announcements
* Manage attendance records
* Manage timetables
* Monitor M-Pesa payment transactions

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS v4

### Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite3
* M-Pesa Daraja API

### Deployment

* Frontend: GitHub Pages
* Backend: Render

## Project Structure

```text
Student-Portal/
├── Student-Portal-Frontend/
├── Student-Portal-Backend/
└── docker-compose.yml
```

## Running the Project Locally

### Clone the repository

```bash
git clone <repository-url>
cd Student-Portal
```

### Backend

```bash
cd Student-Portal-Backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt


python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

### Frontend

```bash
cd Student-Portal-Frontend

cp .env 

npm install
npm run dev
```

## Running with Docker

```bash
docker -compose up --build
```

This starts the frontend, backend, and database together.

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

### Backend

```env
DJANGO_SECRET_KEY=your_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173

MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://your-callback-url/api/payments/mpesa/callback/
```

## Deployment

The application is configured for deployment with:

* GitHub Pages (Frontend)
* Render (Backend)

## Future Improvements

* Email notifications
* Student performance analytics
* File uploads
* Improved reporting

## License

This project is available for learning and portfolio purposes.

## Author

Ezra Kipyego
