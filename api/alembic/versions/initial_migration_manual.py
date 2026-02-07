"""Initial migration

Revision ID: initial001
Revises: 
Create Date: 2025-12-29 15:50:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'initial001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.String(255), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(255)),
        sa.Column('first_name', sa.String(100)),
        sa.Column('last_name', sa.String(100)),
        sa.Column('phone', sa.String(20)),
        sa.Column('address', sa.Text()),
        sa.Column('email_verified', sa.Boolean(), default=False),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('is_superuser', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
        sa.Column('last_login', sa.DateTime(timezone=True)),
        sa.Column('gdpr_consent_date', sa.DateTime(timezone=True)),
        sa.Column('marketing_consent', sa.Boolean(), default=False),
        sa.Column('data_processing_consent', sa.Boolean(), default=True),
    )
    op.create_index('ix_users_email', 'users', ['email'])

    # Orders table
    op.create_table(
        'orders',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('order_number', sa.String(50), nullable=False, unique=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('package_type', sa.String(50), nullable=False),
        sa.Column('status', sa.String(50), default='pending'),
        sa.Column('progress', sa.Integer(), default=0),
        sa.Column('amount', sa.Numeric(10, 2), nullable=False),
        sa.Column('currency', sa.String(3), default='USD'),
        sa.Column('payment_status', sa.String(20), default='pending'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
        sa.Column('estimated_completion', sa.DateTime(timezone=True)),
        sa.Column('completed_at', sa.DateTime(timezone=True)),
        sa.Column('assigned_manager_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id')),
    )
    op.create_index('ix_orders_order_number', 'orders', ['order_number'])
    op.create_index('ix_orders_status', 'orders', ['status'])

    # Order services table
    op.create_table(
        'order_services',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=False),
        sa.Column('service_name', sa.String(100), nullable=False),
        sa.Column('service_type', sa.String(50), nullable=False),
        sa.Column('status', sa.String(50), default='pending'),
        sa.Column('completed_at', sa.DateTime(timezone=True)),
    )

    # Businesses table
    op.create_table(
        'businesses',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('business_name', sa.String(255), nullable=False),
        sa.Column('ein', sa.String(20), unique=True),
        sa.Column('formation_state', sa.String(2)),
        sa.Column('formation_date', sa.Date()),
        sa.Column('business_type', sa.String(100)),
        sa.Column('industry', sa.String(100)),
        sa.Column('business_address', sa.Text()),
        sa.Column('city', sa.String(100)),
        sa.Column('state', sa.String(2)),
        sa.Column('zip_code', sa.String(10)),
        sa.Column('country', sa.String(2), default='US'),
        sa.Column('business_email', sa.String(255)),
        sa.Column('business_phone', sa.String(20)),
        sa.Column('website_url', sa.String(255)),
        sa.Column('description', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
    )
    op.create_index('ix_businesses_ein', 'businesses', ['ein'])

    # Documents table
    op.create_table(
        'documents',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('document_type', sa.String(100), nullable=False),
        sa.Column('file_url', sa.Text(), nullable=False),
        sa.Column('file_path', sa.Text()),
        sa.Column('file_size', sa.Integer()),
        sa.Column('mime_type', sa.String(100)),
        sa.Column('is_verified', sa.Boolean(), default=False),
        sa.Column('is_public', sa.Boolean(), default=False),
        sa.Column('description', sa.Text()),
        sa.Column('uploaded_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('uploaded_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id')),
        sa.Column('verified_at', sa.DateTime(timezone=True)),
        sa.Column('verified_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id')),
    )
    op.create_index('ix_documents_document_type', 'documents', ['document_type'])

    # Support tickets table
    op.create_table(
        'support_tickets',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('ticket_number', sa.String(50), nullable=False, unique=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id')),
        sa.Column('subject', sa.String(255), nullable=False),
        sa.Column('category', sa.String(50), nullable=False),
        sa.Column('status', sa.String(20), default='open'),
        sa.Column('priority', sa.String(20), default='normal'),
        sa.Column('assigned_to', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id')),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
        sa.Column('resolved_at', sa.DateTime(timezone=True)),
    )
    op.create_index('ix_support_tickets_ticket_number', 'support_tickets', ['ticket_number'])
    op.create_index('ix_support_tickets_status', 'support_tickets', ['status'])

    # Ticket messages table
    op.create_table(
        'ticket_messages',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('ticket_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('support_tickets.id'), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('is_staff', sa.Boolean(), default=False),
        sa.Column('is_internal', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # Notifications table
    op.create_table(
        'notifications',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('notification_type', sa.String(50), nullable=False),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('read', sa.Boolean(), default=False),
        sa.Column('read_at', sa.DateTime(timezone=True)),
        sa.Column('action_url', sa.Text()),
        sa.Column('action_text', sa.String(50)),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index('ix_notifications_notification_type', 'notifications', ['notification_type'])
    op.create_index('ix_notifications_read', 'notifications', ['read'])

    # Activity log table
    op.create_table(
        'activity_log',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id')),
        sa.Column('activity_type', sa.String(50), nullable=False),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('description', sa.Text()),
        sa.Column('metadata_json', sa.Text()),
        sa.Column('ip_address', sa.String(45)),
        sa.Column('user_agent', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index('ix_activity_log_activity_type', 'activity_log', ['activity_type'])


def downgrade() -> None:
    op.drop_table('activity_log')
    op.drop_table('notifications')
    op.drop_table('ticket_messages')
    op.drop_table('support_tickets')
    op.drop_table('documents')
    op.drop_table('businesses')
    op.drop_table('order_services')
    op.drop_table('orders')
    op.drop_table('users')
