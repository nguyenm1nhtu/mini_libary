import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
    title: 'Mini Libary Website',
    description:
        'Mini Libary is a nonprofit organization with a mission to build community, inspire readers, and expand book access for all through a global network',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}
