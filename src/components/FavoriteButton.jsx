import React from 'react';
import GenericFavoriteButton from './GenericFavoriteButton';

const FavoriteButton = ({ postId, size = 20, className = "" }) => {
  // Size prop'unu GenericFavoriteButton format'ına çevir
  let buttonSize = "default";
  if (size <= 16) buttonSize = "sm";
  else if (size >= 24) buttonSize = "large";
  
  return (
    <GenericFavoriteButton 
      targetId={postId} 
      targetType="post" 
      size={buttonSize}
      className={className}
      showCount={false}
    />
  );
};

export default FavoriteButton; 