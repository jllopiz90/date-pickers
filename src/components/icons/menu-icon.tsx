import React from 'react';

import AppComponentProps from '../app-component.props';

import { IconComponent } from './icon.component';

export type MenuIconProps = AppComponentProps & {
    isActive: boolean;
    icon: IconComponent;
    activeClass?: string;
    inactiveClass?: string;
};
export const MenuIcon: React.FC<MenuIconProps> = ({
    isActive,
    icon: Icon,
    activeClass = 'text-gray-500',
    inactiveClass = 'text-gray-400 group-hover:text-gray-500',
    className = 'mr-3 h-6 w-6',
}) => {
    const iconClassName = isActive ? activeClass : inactiveClass;
    return <Icon className={`${iconClassName} ${className}`} />;
};

export default MenuIcon;
