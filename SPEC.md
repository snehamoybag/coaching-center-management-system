# Coaching Center Management System – Spec (v1)

## 1. Problem Statement

A small coaching center needs a simple internal system to manage students,
batches, attendance, and monthly fee status. Currently this is handled
using notebooks, Excel, and WhatsApp, leading to mistakes and confusion.

## 2. Target Users

- Admin
- Teacher

## 3. Goals

- Centralize student and batch data
- Allow teachers to mark attendance easily
- Let admin track unpaid fees

## 4. Non-Goals

- Online payments
- Parent or student login
- Notifications (SMS / WhatsApp / Email)
- Mobile app
- Analytics or reports

## 5. Core Features

### 5.1 Authentication

- Email + password login
- Role-based access (admin, teacher)

### 5.2 Student Management

- Create, edit, deactivate students
- Assign students to batches

### 5.3 Batch Management

- Create batches
- Assign teachers
- Set monthly fee amount

### 5.4 Attendance

- Teachers select batch + date
- Mark present / absent
- Attendance saved once per day per batch

### 5.5 Fee Tracking

- Monthly fee status per student (paid / unpaid)
- Admin can view unpaid students

## 6. Assumptions

- Single coaching center
- Small number of users (<20)
- Desktop-first usage

## 7. Out of Scope (Explicit)

Anything not listed in "Core Features" is intentionally excluded.
