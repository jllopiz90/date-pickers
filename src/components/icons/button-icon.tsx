import React from 'react';

import { IconComponent } from '../icons/icon.component';

export interface ActionButttonProps {
    icon?: IconComponent;
    onClick: () => void;
    title?: string;
    shadow?: boolean;
    border?: boolean;
    first?: boolean;
    last?: boolean;
    className?: string;
}

export const ActionButtton: React.FC<ActionButttonProps> = ({
    title,
    onClick,
    icon: Icon,
    shadow = false,
    border = false,
    first = false,
    last = false,
    className = '',
}) => {
    const classes = [
        'relative',
        'inline-flex',
        'items-center',
        'px-4',
        'py-2',
        first ? 'rounded-l-md' : '',
        last ? 'rounded-r-md' : '',
        first && !last ? 'border-r-0' : '',
        border ? 'border' : '',
        border ? 'border-gray-300': '',
        'bg-white',
        'text-sm',
        'font-medium',
        'text-gray-700',
        'hover:bg-gray-50',
        'focus:z-10',
        'focus:outline-none',
        'focus:ring-1',
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        shadow ? 'shadow' : '',
        className,
    ].join(' ');
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={classes}
        >
            {Icon ? <Icon /> : title || ''}
        </button>
    );
};

export default ActionButtton;
