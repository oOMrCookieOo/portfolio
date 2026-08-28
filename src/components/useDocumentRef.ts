import { useRef } from 'react';

/** reui's Scrollspy only takes the window path when `targetRef.current === document`. */
export function useDocumentRef() {
	return useRef<Document>(
		typeof document === 'undefined' ? null : document,
	) as React.RefObject<Document | null>;
}
