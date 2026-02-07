"""Set default values for onboarding_completed

Revision ID: 1e5903b0048c
Revises: e552dcbfa3e6
Create Date: 2025-12-30 00:09:08.149953

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e5903b0048c'
down_revision = 'e552dcbfa3e6'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Set default value for existing users with NULL onboarding_completed
    op.execute("UPDATE users SET onboarding_completed = FALSE WHERE onboarding_completed IS NULL")
    
    # Make onboarding_completed NOT NULL with default
    op.alter_column('users', 'onboarding_completed',
                   existing_type=sa.Boolean(),
                   nullable=False,
                   server_default=sa.text('false'))


def downgrade() -> None:
    # Revert to nullable (for rollback)
    op.alter_column('users', 'onboarding_completed',
                   existing_type=sa.Boolean(),
                   nullable=True,
                   server_default=None)

