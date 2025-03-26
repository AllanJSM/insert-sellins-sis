# 📄 Sell-in Insert Guide – SiS EP

## 🔁 Generating SQL scripts for current and previous year sell-ins (stores and distributors)

1. Import the file named `Volume_{file date}` and rename it to `Volume.xlsx`
2. Run the script: `runSellinDay.js`
3. The following SQL script files will be created or updated:
   - `../store_2025.sql`
   - `../store_2024.sql`
   - `../distributor_2025.sql`
   - `../distributor_2024.sql`

---

## 🛠️ Inserting daily sell-in data – stores

### 🔍 Step 1: Current Month

- **1. Check for existing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id),
  sum(total) 
  from sellins s 
  where 
  "storeId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE)
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **2. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE) and "storeId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../store_2025.sql` file in your database.

- **Verify:**
  Re-run the SELECT (1.) query to confirm the records were inserted successfully.

---

### 🔁 Step 2: Same Month, Previous Year

- **3. Check for existing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id), 
  sum(total)
  from sellins s 
  where 
  "storeId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '12 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **4. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '12 month') and "storeId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../store_2024.sql` file.

- **Verify:**
  Re-run the SELECT (3.) query to confirm the records were inserted successfully.

---

## 🛠️ Inserting daily sell-in data – distributors

### 🔍 Step 1: Current Month

- **1. Check for existing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id),
  sum(total)
  from sellins s 
  where 
  "distributorId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE)
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **2. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE) and "distributorId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../distributor_2025.sql` file.

- **Verify:**
  Re-run the SELECT (1.) query to confirm the records were inserted successfully.

---

### 🔁 Step 2: Same Month, Previous Year

- **3. Check for existing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id),
  sum(total) 
  from sellins s 
  where 
  "distributorId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '12 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **4. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '12 month') and "distributorId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../distributor_2024.sql` file.

- **Verify:**
  Re-run the SELECT (3.) query to confirm the records were inserted successfully.

---

## 📦 Process for Closing (Apuração)

1. Import the file named `Fechamento_{file month}` and rename it to `Fechamento.xlsx`
2. Run the script: `runClosing.js`
3. The following SQL script files will be created or updated:
   - `../store_closing_2025.sql`
   - `../store_closing_2024.sql`
   - `../distributor_closing_2025.sql`
   - `../distributor_closing_2024.sql`

---

### 🛠️ Inserting closing sell-in data – stores

- **1. Check for existing closing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id), 
  sum(total)
  from sellins s 
  where 
  "storeId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '1 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **2. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '1 month') and "storeId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../store_closing_2025.sql` file.

- **Verify:**
  Re-run the SELECT (1) query to confirm the records were inserted successfully.

---

- **3. Check for previous year records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id), 
  sum(total)
  from sellins s 
  where 
  "storeId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '13 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **4. Delete the existing records:**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '13 month') and "storeId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../store_closing_2024.sql` file.

- **Verify:**
  Re-run the SELECT (3) query to confirm the records were inserted successfully.

---

### 🛠️ Inserting closing sell-in data – distributors

- **5. Check for existing closing sell-in records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id), 
  sum(total)
  from sellins s 
  where 
  "distributorId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '1 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **6. Delete the existing records (if any):**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '1 month') and "distributorId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../distributor_closing_2025.sql` file.

- **Verify:**
  Re-run the SELECT (5) query to confirm the records were inserted successfully.

---

- **7. Check for previous year records:**
  ```sql
  select 
  "registeredAt", 
  "createdAt", 
  count(id), 
  sum(total)
  from sellins s 
  where 
  "distributorId" is not null 
  and date_trunc('month', s."registeredAt") = date_trunc('month', CURRENT_DATE - interval '13 month')
  group by 
  "registeredAt", 
  "createdAt"
  ```

- **8. Delete the existing records:**
  ```sql
  delete from sellins where date_trunc('month', "registeredAt") = date_trunc('month', CURRENT_DATE - interval '13 month') and "distributorId" is not null
  ```

- **Run the insert:**
  Paste and execute the full content of the `../distributor_closing_2024.sql` file.

- **Verify:**
  Re-run the SELECT (7) query to confirm the records were inserted successfully.
