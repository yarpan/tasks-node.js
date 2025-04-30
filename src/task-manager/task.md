# Task Manager with File-Based Storage

### **Objective**
Create a REST API using **Express** to manage tasks, where all data is stored in a `tasks.json` file. The API should fully operate with this file:
- For every modification — rewrite the file.
- For every read operation — read data from the file.

---

### **Task Structure**
Each task in the file should follow this structure:
```json
{
  "id": 1,
  "title": "Learn Express",
  "description": "Understand how routing and middleware work",
  "status": "todo",
  "createdAt": "2025-04-06T14:12:00Z"
}
```

### **Requirements**

1. **File Storage**
   - Use `fs.promises` (e.g., `fs.readFile`, `fs.writeFile`) for file operations.
   - File path: `./data/tasks.json`.
   - **Read** the file before every operation.
   - **Rewrite** the file after every change.

2. **Validation**
   - **`title`**: Mandatory, must have at least 3 characters.
   - **`status`**: Must be one of the following values:
     - `"todo"`
     - `"in-progress"`
     - `"done"`

3. **Middleware Logging**
   - Log the HTTP method, path, and timestamp of each request to the **console**.

4. **Error Handling**
   - Return `404 Not Found` if `id` is not found.
   - Return `400 Bad Request` if validation fails.
