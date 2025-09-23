import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`custom-header ${isHome ? 'home' : 'default'}`}>
      <h1 className={`header-text ${isHome ? 'home' : 'default'}`}>HELLO</h1>
    </header>
  );
}

export default Header;
