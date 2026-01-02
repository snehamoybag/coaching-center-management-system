# Database Schema - Coaching center (v1)

## users

- id
- first_name
- last_name
- password_hash
- email
- contact_number
- role (admin | teacher)
- status (active | inactive)

## students

- id
- first_name
- last_name
- date_of_birth (dd/mm/yyyy)
- parent_name
- contact_number
- aadhaar_number
- registered_at
- status (active | inactive)

## batches

- id
- name

## student_batches

- id
- student_id
- batch_id

## teacher_batches

- id
- teacher_id
- batch_id

## student_attendance

- id
- batch_id
- student_id
- date

## student_fees

- id
- amount
- student_id

## student_payments

- id
- fee_id
- student_id
- amount
- date
- mode (upi| bank | cash)
