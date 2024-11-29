# RestroApp - Restaurant Management and Ordering Platform

## 📝 Project Overview

RestroApp is a comprehensive restaurant management and online ordering application designed to streamline restaurant operations and enhance customer dining experiences. The platform provides features for customers, restaurant staff, and management to interact seamlessly.

## 🌟 Features

### Customer Features
- Browse restaurant menus
- Place online orders
- View restaurant details and ratings
- Track order status in real-time
- Save favorite dishes and restaurants

### Staff Features
- Menu management
- Order processing
- Inventory tracking
- Customer feedback management

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Django
- **Database:** Django
- **Authentication:** JWT
- **Real-time Updates:** WebSockets

## 📦 Project Structure
```
restro-app/
│
├── Backend/               # Django backend
│   ├── restaurant/        # Restaurant management
│   ├── orders/            # Online ordering
│   ├── users/             # User management
│   ├── manage.py          # Django management script
│   └── requirements.txt   # Python dependencies
│
├── Frontend/              # React frontend
│   ├── src/               # Source code
│   ├── public/            # Static files
│   ├── package.json       # Dependencies
│   └── README.md          # Documentation
│
├── Architecture/          # Architecture diagrams    
│   ├── RestroApp.png
│   └── RestroApp.drawio
|
├── Video/                 # Project Overview Video
```

## Architecture
![RestroApp Architecture](https://github.com/MrHacker8468/Restorent_Project/blob/main/architecture/RestroApp.png)

## Video Overview of the Project
[![RestroApp Overview](https://github.com/MrHacker8468/Restorent_Project/blob/main/Video/Project%20Overview.mp4)]

## 🧪 Running Tests
 ### backend
```bash
cd restro-app/Backend
python manage.py test
```
 ### frontend
```bash
cd restro-app/Frontend
npm run dev
```