# AI HR Support Assistant

A full-stack AI-assisted HR support dashboard built with React, TypeScript, FastAPI, SQLAlchemy, and a local SQLite database for MVP development.

This project simulates an internal HR support tool where employees can submit HR requests, HR team members can review AI-assisted ticket triage, and admins can view ticket overview data.

The current version uses **mock AI classification** to categorise tickets, assign priority, generate suggested HR response drafts, and provide internal AI notes for HR review.

## Project Status

Current stage: MVP frontend and backend working locally

* ✅ FastAPI backend
* ✅ SQLite local database
* ✅ SQLAlchemy ticket model
* ✅ React + TypeScript frontend
* ✅ Employee / HR Team / Admin demo views
* ✅ Mock AI ticket classification
* ✅ Suggested HR response drafts
* ✅ Internal AI notes
* ✅ Ticket queue cards
* ✅ Responsive mobile layout
* ✅ Mobile menu
* ✅ Collapsible dashboard panels
* ✅ HR/Admin frontend filters
* ✅ Category / priority / status pills

![HR Team Dashboard](docs/images/hr-team-overview.png)

![Employee Dashboard](docs/images/employee-overview.png)

![Admin Dashboard](docs/images/admin-overview.png)

![Mobile Dashboard](docs/images/mobile-menu.png)

## Why I Built This

This project was created to demonstrate practical full-stack engineering skills through an internal-tool style application that connects:

* frontend dashboard development
* backend API design
* database storage
* AI-assisted workflow design
* HR/business operations context
* responsive UI design
* clean documentation and GitHub workflow

The project is designed to support applications for software engineering, full-stack, backend, AI applications, and internal tools roles.

## Key Features

### Employee View: 
Employees can submit HR support requests through a simple request form.

Current fields:

* ticket title
* message

After submission, the backend stores the ticket and applies mock AI classification.

⸻

### HR Team View

HR team members can review submitted tickets and AI-assisted triage results.

Current HR features:

* AI Review Queue
* Ticket Queue
* ticket category
* ticket priority
* ticket status
* suggested response draft
* internal AI note
* review log
* category filter
* priority filter
* newest / oldest sorting

⸻

### Admin View

Admins can view operational ticket stats and filter the admin ticket queue.

Current admin stats:

* total tickets
* open tickets
* high priority tickets
* number of categories

Current admin features:

* admin overview cards
* filtered ticket queue
* category filter
* priority filter
* newest / oldest sorting

⸻

## Mock AI Classification

The MVP uses deterministic mock AI logic instead of a real LLM API.

This makes the project easier to run locally because it does not require:

* API keys
* paid AI access
* external AI service setup
* network calls to an LLM provider

Example classification behaviour:
```text
Message contains “pay”, “salary”, “bank”, “wage”, or “payroll”
Category: Payroll
```

```text
Message contains “urgent”, “blocked”, “missing”, “cannot access”, or “not paid”
Priority: High
```

The AI output includes:

```text
category
priority
suggested_response
classification_reasoning
```

## Tech Stack

Frontend

* React
* TypeScript
* Vite
* CSS
* Responsive dashboard layout

Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite for MVP development
* Pydantic schemas

Development Tools

* Git
* GitHub
* VS Code
* Local frontend/backend development servers

## Running Locally
Clone the repository:
```bash
git clone https://github.com/Iris408/ai-hr-support-assistant.git
cd ai-hr-support-assistant
```

### Backend Setup
Go into the backend folder:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies and run the FastAPI backend:
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:
```text
http://127.0.0.1:8000
```

Swagger Docs:
```text
http://127.0.0.1:8000/docs
```

### Frontend Setup
Open a second terminal and go into the frontend folder:
```bash
cd frontend
```

Install dependencies and run the frontend:
```bash
npm install
npm run dev
```

Frontend runs at:
```text
http://localhost:5173
```

### Current MVP Limitations

The current Employee / HR Team / Admin views are demo views. In a future version, these will be connected to real JWT authentication and role-based access control.


## Important Note

This project uses mock/demo HR data only.

It is not intended to process real employee data, private HR information, medical information, payroll records, or sensitive workplace information in its current MVP state.

AI outputs are shown as draft suggestions for HR review, not automatic decisions.

## Author
Built by Iris408