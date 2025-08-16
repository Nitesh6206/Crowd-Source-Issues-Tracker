# 🛠️ Crowd-Source Issues Tracker

A collaborative issue tracking system that enables users to report, assign, and manage issues in an organized and efficient way. Designed for teams and communities to streamline issue resolution with transparency and accountability.

---

## 🧩 Installation

1. Clone the repository:  
   `git clone https://github.com/Nitesh6206/Crowd-Source-Issues-Tracker.git`

2. Install dependencies:

   **Backend**  
   - Navigate to the backend directory:  
     `cd Backend`  
   - Install the required packages:  
     `mvn install`

   **Frontend**  
   - Navigate to the frontend directory:  
     `cd ../Frontend`  
   - Install the required packages:  
     `npm install`

3. Set up the database:  
   - Create a database (e.g., `crowd_issues_db`)  
   - Update configuration in `application.properties` (for backend) and `.env` (for frontend, if used)

4. Apply database migrations (if needed):  
   - Run: `mvn flyway:migrate` or use provided SQL scripts

5. Launch the application:  
   - Start the backend server:  
     `mvn spring-boot:run`  
   - Start the frontend development server:  
     `npm run dev`  
   - Application accessible at:  
     - Frontend → `http://localhost:3000`  
     - Backend → `http://localhost:8080`

---

## 🎯 Usage

- Register or login to your account  
- Submit issues with relevant details like title, description, and category  
- Browse and search submitted issues  
- Filter issues based on status or assignee  
- Assign or claim issues  
- Add comments and track discussion  
- Update issue status: **Open → In Progress → Resolved**  
- Admins can monitor overall progress and view analytics

---

## 🧪 Development & Testing

- **Testing Tools:** JUnit (Backend), Jest (Frontend)
- Run tests:

  **Backend:**  
  `mvn test`

  **Frontend:**  
  `npm test` or `yarn test`

---

## 📸 Project Insight

Take a look at the interface in action:

<img width="100%" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/bc485a55-14e4-42ae-917b-37cd0225322d" />

<img width="100%" alt="Issue List View" src="https://github.com/user-attachments/assets/da7ab454-4951-49cc-ba4d-681737096734" />

<img width="100%" alt="Admin Panel" src="https://github.com/user-attachments/assets/86428e97-9cc5-4ffd-9784-5b5eefaa6e60" />

---

## 🤝 Contributing

Contributions are highly appreciated!  
To contribute:

1. Fork the repository  
2. Create a new branch:  
   `git checkout -b feature/your-feature-name`  
3. Make your changes and commit:  
   `git commit -m "Your message"`  
4. Push to your fork:  
   `git push origin feature/your-feature-name`  
5. Open a Pull Request and describe your changes

> Please ensure your code follows the existing style and includes necessary tests where applicable.

