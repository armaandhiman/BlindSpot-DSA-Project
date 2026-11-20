# BlindSpot – DSA Decision Discovery Engine

BlindSpot is a web-based decision discovery application designed to help users explore possible choices and discover alternatives through a structured decision-making process.

The project combines Data Structures and Algorithms (DSA) with web development technologies. Its core algorithmic component uses Breadth-First Search (BFS) implemented in C++.

## Features

- Decision analysis and factor exploration.
- BFS-based discovery using graph traversal.
- User registration and login.
- Decision history management.
- User profile interface.
- Frontend and backend integration.

## Technologies Used

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| DSA Implementation | C++ |
| Algorithm | Breadth-First Search (BFS) |
| Database | SQLite (sql.js) |
| Authentication | Express Session, bcryptjs |

## Project Structure

```text
BlindSpot-DSA-Project/
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── database/
├── Dsa/
│   └── main.cpp
├── Frontend/
│   ├── index.html
│   ├── auth.html
│   ├── auth.js
│   ├── auth.css
│   ├── script.js
│   ├── style.css
│   ├── profile.html
│   ├── profile.js
│   └── profile.css
├── .gitignore
└── README.md
```

## Installation and Execution

### Prerequisites

- Node.js and npm
- C++ compiler (g++)
- Visual Studio Code
- Live Server extension

### 1. Clone the Repository

```bash
git clone https://github.com/armaandhiman/BlindSpot-DSA-Project.git
cd BlindSpot-DSA-Project
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Start the Backend

```bash
node server.js
```

Backend server:

```text
http://localhost:3000
```

### 4. Start the Frontend

Open the Frontend folder in Visual Studio Code.

Right-click `index.html` and select **Open with Live Server**.

### 5. C++ BFS Component

The C++ implementation is located in:

```text
Dsa/main.cpp
```

Compile and execute it using a C++ compiler. The executable path should match the configuration used by the backend.

## Data Structures and Algorithms

### Breadth-First Search (BFS)

Breadth-First Search is a graph traversal algorithm that explores vertices level by level, starting from a source vertex.

In BlindSpot, BFS is used as the core graph traversal technique to explore connected possibilities and discover alternatives.

### Applications of BFS

- Systematic graph traversal.
- Exploring connected vertices.
- Finding shortest paths in unweighted graphs.
- Discovering possibilities level by level.

## Learning Outcomes

- Understanding and implementing graph traversal.
- Applying BFS to a practical project.
- Integrating C++ with Node.js.
- Building frontend-backend communication using APIs.
- Working with SQLite database integration.
- Implementing authentication and session management.

## Future Improvements

- Add more graph traversal and search algorithms.
- Improve decision recommendation capabilities.
- Add data visualization for discovered alternatives.
- Enhance the user interface and user experience.
- Introduce more advanced decision analysis features.
