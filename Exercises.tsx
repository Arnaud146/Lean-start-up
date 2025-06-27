import React from 'react';
import { NavItem } from '../components/NavItem';
import { useNavigate } from 'react-router-dom';

const Exercises: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavItem 
        icon="/assets/home-icon.png" 
        label="Accueil" 
        onClick={() => navigate('/home')} 
      />
      <NavItem 
        icon="/assets/exercise-icon.png" 
        label="Exercices" 
        active
        onClick={() => navigate('/exercises')}
      />
      <NavItem 
        icon="/assets/article-icon.png" 
        label="Articles" 
        onClick={() => navigate('/articles')} 
      />
    </div>
  );
};

export default Exercises; 