<?php

namespace App\Enum;

enum PriorityEnum: string
{
    case NORMAL = 'normal';   // Normal priority
    case HIGH = 'high';       // High priority
    case LOW = 'low';         // Low priority
    case URGENT = 'urgent';   // Urgent priority
}
