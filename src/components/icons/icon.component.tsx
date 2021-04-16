import React from 'react';

import AppComponentProps from '../app-component.props';

export type IconComponentProps = AppComponentProps & { color?: string; size?: number; double?: boolean; };

export type IconComponent = React.FC<IconComponentProps>;

export default IconComponent;