  <NavItem 
    icon="/assets/home-icon.png" 
    label="Accueil" 
    onClick={() => navigate('/home')} 
  />
  <NavItem 
    icon="/assets/exercise-icon.png" 
    label="Exercices" 
    onClick={() => navigate('/exercises')} 
  />
  <NavItem 
    icon="/assets/article-icon.png" 
    label="Articles" 
    active
    onClick={() => navigate('/articles')}
  />
  <NavItem 
    icon="👤" 
    label="Profil" 
    onClick={() => navigate('/profile')} 
  /> 