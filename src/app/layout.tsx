import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'LinguaPath — английский в своём ритме',description:'Понятный путь изучения английского от A1 до C1. Без регистрации.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ru"><body>{children}</body></html>}
