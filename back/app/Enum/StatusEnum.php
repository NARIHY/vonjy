<?php

namespace App\Enum;

enum StatusEnum: string
{
    case PENDING = 'pending';           // Reported emergency but not yet processed
    case IN_PROGRESS = 'in_progress';   // Being processed
    case RESOLVED = 'resolved';         // Resolved
    case CANCELED = 'canceled';         // Canceled
    case UNREAD = 'unread';             // Unread
    case READ = 'read';                 // Read
    case ARCHIVED = 'archived';         // Archived
    case DELETED = 'deleted';           // Deleted
    case SPAM = 'spam';                 // Marked as spam
    case IMPORTANT = 'important';       // Marked as important
    case NORMAL = 'normal';             // Normal priority
    case HIGH = 'high';                 // High priority
    case LOW = 'low';                   // Low priority
    case URGENT = 'urgent';             // High urgency

    case RUMMEUR = 'rumeur';
}
