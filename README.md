# 🚚 Knovator Assignment - FleetLink

FleetLink is a logistics booking system where users can add vehicles, search & book them, and manage their bookings with ease.  
The project is fully dockerized with separate containers for **frontend (Next.js)**, **backend (Express + MongoDB)**, and **MongoDB database**.

---

## 📂 Project Structure
knovator-assignment/
┣ client/ # Frontend (Next.js)
┣ server/ # Backend (Node.js + Express + MongoDB)
┣ docker-compose.yml # Docker configuration for frontend, backend & database
┣ .gitignore
┗ README.md

---

## 🚀 Features
- Add new vehicles  
- Search and book vehicles  
- View and cancel bookings  
- Vehicles overview dashboard  
- API endpoints for vehicles & bookings  
- Dockerized setup with `docker-compose`  
- MongoDB integration with Mongoose  

---

## 🐳 Run with Docker
Make sure Docker and Docker Compose are installed on your system.  

In the **root folder** (`knovator-assignment/`), run:

```bash
docker-compose up --build

cd server
npm install
npm run dev


cd client
npm install
npm run dev

