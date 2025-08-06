import React from 'react';
// Removed motion import

const StaggerContainer = ({ 
  children, 
  className = "",
  direction = "up",
  staggerDelay = 0.05,
  duration = 0.3
}) => {
  // Basit animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        duration: 0.1
      }
    }
  };

  const getItemVariants = () => {
    const distance = 15; // Daha az hareket
    
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: { duration } }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: { duration } }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: { duration } }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: { duration } }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration } }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } }
        };
    }
  };

  const itemVariants = getItemVariants();

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerContainer; 