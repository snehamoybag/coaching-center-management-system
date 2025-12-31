# Database Schema - Coaching center (v1)

## users

- id
- first_name
- last_name
- password_hash
- email
- contact_number
- role (admin | teacher)

## students

- id
- first_name
- last_name
- parent_name
- contact_number
- registered_at
- active

## batches

- id
- name

## batch_sessions

- id
- batch_id
- start_time
- end_time
- date

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
- batch_session_id
- student_id
- status (present | absent)

## fees

- id
- student_id
- amount

## student_payments

- id
- fee_id
- student_id
- amount
- date
- mode (upi| bank | cash)
