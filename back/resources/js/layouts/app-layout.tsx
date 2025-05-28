import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            <AppearanceToggleDropdown />
        </div>
    </AppLayoutTemplate>
);
