import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/hbd-wh';

  const [highlightFirstTab, setHighlightFirstTab] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem('highlightTab');
    if (flag === 'true') {
      setHighlightFirstTab(true);
    }
  }, []);

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
            className={`tab-button ${location.pathname === tab.path ? 'active' : ''} 
              ${highlightFirstTab && index === 0 ? 'highlight-tab' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label} {highlightFirstTab && index === 0 && '👉'}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
