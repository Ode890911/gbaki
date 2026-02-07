# Database Migration: Add User Roles

## Overview
This migration adds the `role` field to the `users` table to support admin dashboard functionality.

## Migration Steps

### 1. Create Migration
```bash
cd api
alembic revision --autogenerate -m "Add user roles to user model"
```

### 2. Review Generated Migration
The migration should add:
- `role` column (Enum: USER, ADMIN, SUPER_ADMIN)
- Default value: USER
- Nullable: False

### 3. Apply Migration
```bash
alembic upgrade head
```

### 4. Set Admin Users
After migration, set admin users:

**Option 1: Using SQL**
```sql
-- Set specific user as admin
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';

-- Set specific user as super_admin
UPDATE users SET role = 'super_admin' WHERE email = 'superadmin@example.com';
```

**Option 2: Using Legacy Field**
Users with `is_superuser = true` will still work (backward compatible)

## Migration File Structure

The migration should look like:
```python
def upgrade():
    # Add role column
    op.add_column('users', sa.Column('role', sa.Enum('user', 'admin', 'super_admin', name='userrole'), nullable=False, server_default='user'))
    
    # Set existing superusers to admin role
    op.execute("UPDATE users SET role = 'admin' WHERE is_superuser = true")

def downgrade():
    op.drop_column('users', 'role')
```

## Verification

After migration, verify:
1. ✅ `role` column exists in `users` table
2. ✅ Existing users have `role = 'user'` by default
3. ✅ Existing superusers have `role = 'admin'`
4. ✅ New users get `role = 'user'` by default

## Notes
- The migration maintains backward compatibility with `is_superuser`
- Both `role` and `is_superuser` are checked in `get_current_admin`
- No data loss will occur


