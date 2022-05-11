import HeaderMenu from '../components/HeaderMenu';
import Footer from '../components/Footer';

export default function MainLayout({ children }) { 
    return (
        <div>
            <HeaderMenu />
            {children}
            <Footer />
        </div>
    )
}