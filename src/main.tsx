import { MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* CSS cannot reach motion's inline styles, so the preference is applied here. */}
		<MotionConfig reducedMotion="user">
			<App />
		</MotionConfig>
	</StrictMode>,
);
