import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/hbd-wh';

  const tabs = [
    { label: '1. About Us', path: '/hbd-wh/about' },
    { label: '2. Present', path: '/hbd-wh/present' },
    { label: '3. Letter', path: '/hbd-wh/letter' },
  ];

  return (
    <header className={`custom-header ${isHome ? 'home' : 'default'}`}>
      <h1
        className={`header-text ${isHome ? 'home' : 'default'}`}
        onClick={() => navigate('/hbd-wh/')}
      >
        ♥HBD♥
      </h1>

      <nav className="tab-nav">
        {tabs.map((tab, index) => (
          <button
            key={tab.path}
            className={`tab-button ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
