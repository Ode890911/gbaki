#!/usr/bin/env python3
"""Fix Alembic version table"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

if DATABASE_URL:
    engine = create_engine(DATABASE_URL)
    with engine.begin() as conn:
        # Delete old version record
        conn.execute(text("DELETE FROM alembic_version WHERE version_num = '6f061ef626b7'"))
        # Set to base
        conn.execute(text("DELETE FROM alembic_version"))
    print('✅ Fixed alembic_version table')
else:
    print('❌ DATABASE_URL not found')
