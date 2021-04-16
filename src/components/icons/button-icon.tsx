import React from 'react';

import AppComponentProps from '../app-component.props';

import { IconComponent } from './icon.component';

export type ButtonIconProps = AppComponentProps & {
    icon: IconComponent;
    onClick: () => void;
};
export const ButtonIcon: React.FC<ButtonIconProps> = ({
    icon: Icon,
    className = '',
    onClick = () => {},
}) => (
    <button className={className} onClick={onClick}>
        <Icon />
    </button>
);

export default ButtonIcon;
