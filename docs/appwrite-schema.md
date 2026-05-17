# Appwrite schema plan

## Required environment variables

- APPWRITE_ENDPOINT
- APPWRITE_PROJECT_ID
- APPWRITE_API_KEY
- NEXT_PUBLIC_APPWRITE_ENDPOINT
- NEXT_PUBLIC_APPWRITE_PROJECT_ID
- NEXT_PUBLIC_APPWRITE_DATABASE_ID
- NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
- NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID
- NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID
- NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID
- NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID (optional)

## Collections

### users

- userId (string, required, unique)
- email (string, required, unique)
- fullName (string, required)
- studentId (string, required, unique)
- department (string, required)
- year (string, required)
- semester (string, required)
- role (enum: student, coordinator, faculty, hoi)
- profilePic (string, optional)
- createdAt (datetime, required)
- updatedAt (datetime, optional)

Permissions (document-level):
- Read: user:{userId}
- Update: user:{userId}
- Delete: user:{userId}

### events

- title (string, required)
- description (string, required)
- deptId (string, required)
- coordinatorId (string, required)
- facultyIds (string[], optional)
- dateStart (datetime, required)
- dateEnd (datetime, required)
- venue (string, required)
- posterFileId (string, optional)
- registrationLimit (integer, required)
- registrationCount (integer, required, default 0)
- customFields (json, optional)
- status (enum: draft, pending, published, completed, cancelled)
- promoted (boolean, optional)
- createdAt (datetime, required)
- updatedAt (datetime, optional)

Permissions:
- Read: public for published; user scoped otherwise
- Update/Delete: coordinator or hoi (enforced in server logic)

### registrations

- eventId (string, required)
- userId (string, required)
- customData (json, optional)
- status (enum: registered, cancelled)
- createdAt (datetime, required)

Permissions:
- Read: user:{userId}, event owners
- Create: user:{userId}

### notifications

- userId (string, required)
- title (string, required)
- body (string, required)
- type (string, required)
- isRead (boolean, required)
- meta (json, optional)
- createdAt (datetime, required)

Permissions:
- Read/Update/Delete: user:{userId}

### certificates (optional)

- eventId (string, required)
- userId (string, required)
- fileId (string, required)
- issuedAt (datetime, required)

Permissions:
- Read: user:{userId}
- Create: event owners
