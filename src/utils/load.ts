import { ComponentType } from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

export default function load<T extends ComponentType<any>>(callback: {
	(): Promise<{ default: T }>;
}): LoadableComponent<ComponentType> {
	return loadable(callback);
}
