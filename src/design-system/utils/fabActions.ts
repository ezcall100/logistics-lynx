import { Building, UserPlus, RefreshCw, Settings, Globe } from 'lucide-react';
import { FABAction } from '../components/FloatingActionButton';

export const getDefaultSuperAdminActions = (): FABAction[] => [
  {
    id: 'add-company',
    label: 'Add Company',
    icon: Building,
    action: () => console.log('Add Company'),
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
  },
  {
    id: 'add-user',
    label: 'Add User',
    icon: UserPlus,
    action: () => console.log('Add User'),
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'create-portal',
    label: 'Create Portal',
    icon: Globe,
    action: () => console.log('Create Portal'),
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
  },
  {
    id: 'system-check',
    label: 'Run System Check',
    icon: RefreshCw,
    action: () => console.log('Run System Check'),
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
  },
  {
    id: 'maintenance',
    label: 'Toggle Maintenance',
    icon: Settings,
    action: () => console.log('Toggle Maintenance'),
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 hover:bg-gray-100',
  },
];