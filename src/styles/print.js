import React from 'react';
import { Global, css } from '@emotion/core';

/* Print stylesheet */

const PrintStyles = () => (
	<Global
		styles={css`
			@media print {
				@page {
					margin: 0.5cm 1cm;
				}

				header,
				footer,
				nav,
				.no-print {
					display: none;
				}

				* {
					font-family: Georgia, serif;
					color: #000 !important;
					background: transparent !important;
					float: none !important;
					width: auto !important;
					margin-left: 0 !important;
					margin-right: 0 !important;
					padding-left: 0 !important;
					padding-right: 0 !important;
					text-shadow: none !important;
					box-shadow: none !important;
				}

				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					font-family: 'Helvetica Neue', Arial, sans-serif;
					page-break-inside: avoid;
					page-break-after: avoid;
				}

				p,
				blockquote,
				ul,
				ol,
				dl,
				tr,
				img {
					page-break-inside: avoid;
				}

				p,
				h2,
				h3 {
					orphans: 3;
					widows: 3;
				}

				ul {
					margin-left: 1.2em !important;
				}
			}
		`}
	/>
);

export default PrintStyles;
