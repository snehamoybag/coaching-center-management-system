# API design - Coaching center (v1)

## Auth

Roles:

- Admin: Have access to everything except records deletion.

- Teacher: Read Access to student details (excluding sensitive data e.g. fees, contact information).
  Read Access to teacher details (excluding sensitive data e.g. contact information).
  Read and write access to attendance.

- Students have no accounts.

### POST /auth/login

Auth:

- Admin and teacher can login to their accounts.

### POST /auth/signup

Auth:

- Teachers account only.
- Admin can promote a teacher to admin role.
- First admin is created manually (seeded).
- Only an admin is allowed to create a teachers account.

## Students

### POST /students

Creates a student.

Auth:

- Only an admin can register/add a student.

### GET /students

Returns:

- A list of students and their details
- List batches they are in.
- Status of their fees (paid | due).

Auth:

- Teachers and admins can access it.
- Teachers are not allowed to access student contact information, their fees details.

### GET /students/:id

Returns:

- Details of the student with the matching id.
- Details of their fees.
- List of batches they are in.

Auth:

- Teachers and admins can access it.

Rule:

- Student with the matching id must exist.

### PUT /students/:id

Updates the details of the student.

Auth:

- Only an admin can update student details.

Rule:

- A student with the matching id must be present.

## Teachers

### GET /teachers

Returns:

- List of teachers.
- List of batches they are in.

Auth:

- Teachers and admins can access it.

### GET /teachers/:id

Returns:

- Details about the teacher with the matching id.
- List of batches they're in.

Auth:

- Teachers and admins can access it.
- Other teachers are not allowed access sensitive information (e.g. contact information).

Rule:

- Teacher with the matching id must exist.

### PUT /teachers/:id

Updates the details of the teacher.

Auth:

- The teacher who ownes the account and admins can update the details.

Rule:

- Teacher with the matching id must exist.

## Batches

### GET /batches

Returns:

- List of batches.
- Number of teachers in a batch.
- Number of students in a batch.

Auth:

- Teachers and admins can access it.

### POST /batches

Creates a batch.

Auth:

- Only admnin can create one.

Rule:

- Batch name must be unique.

### GET /batches/:id

Returns:

- Details about the batch with the matching id.

Auth:

- Teachers and admins can access it.

Rule:

- Batch with the matching id must exist.

### PUT /batches/:id

Updates the details of the batch with the matching id.

Auth:

- Only admin can update batch details.

Rule:

- Batch with the matching id must exist.

### GET /batches/:id/students

Returns:

- List of students in the batch with the matching id.
- Status of their fees (paid | due).

Auth:

- Teachers and admins can access it.
- Teachers are not allowed to access fees status and contact information.

Rule:

- Batch with the matching id must exist.

### GET /batches/:id/teachers

Returns:

- List of teachers in the batch with the matching id

Rule:

- Batch with the matching id must exist.

Auth:

- Teachers and admins can access it.
- Teachers are not allowed to access contact informations and other sensitive data.

### GET /batches/:id/attendances

Returns:

- List of recent attendance in the batch with the matching id.

Auth:

- Teachers and admins can access it.

Rule:

- Batch with the matching id must exist.

### POST /batches/:id/attendances

Auth:

- Teachers and admins can take attendances.

Rule:

- Batch with the matching id must exist.

### GET /attendances/:attendanceId

Auth:

- Teachers and admins can access.

Rule:

- Batch with the matching id must exist.

### PUT /attendances/:attendanceId

Auth:

- Teachers and admins can update attendances.

Rule:

- Batch with the matching id must exist.

## Payments

### GET /payments

Returns:

- List of recent payments.

Auth:

- Only admin can access it.

### POST /payments

Creates a new payment details.

Auth:

- Only admin can create a payment detail.

### GET /payments/:id

Returns:

- Details of the payment with the matching id.

Auth:

- Only admin can access it.

Rule:

- Payement with the id must exist.
