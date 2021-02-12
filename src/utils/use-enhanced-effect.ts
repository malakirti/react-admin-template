import { useLayoutEffect, useEffect } from 'react';

const useEnhancedEffect = typeof document !== 'undefined' && document.createElement !== undefined
	? useLayoutEffect
	: useEffect;

export default useEnhancedEffect;
