import React, { useState } from 'react';
import './TheForm.css';
import { motion } from 'framer-motion';

const TheForm = () => {
  const [size, setSize] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [liquidHeight, setLiquidHeight] = useState(0);
  const [liquidColor, setLiquidColor] = useState('rgba(255, 192, 203, 0.6)');
  const [flavorSelected, setFlavorSelected] = useState(false);
  const [pendingFlavor, setPendingFlavor] = useState(null);
  const [topping, setTopping] = useState('');
  const [toppingsList, setToppingsList] = useState([]);
  const [showAddToppingButton, setShowAddToppingButton] = useState(false);
  const [iceAdded, setIceAdded] = useState(false);
  const [showPoppingBobaFlavors, setShowPoppingBobaFlavors] = useState(false);
  const [poppingBobaFlavor, setPoppingBobaFlavor] = useState('');
  const [strawVisible, setStrawVisible] = useState(false);

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setActiveSize(newSize);
    setLiquidHeight(0);
    setFlavorSelected(false);
    setToppingsList([]);
  };

  const handleDrinkTypeChange = (type) => {
    setDrinkType(type);
    setLiquidHeight(0);
    setFlavorSelected(false);
  };

  const handleFlavorChange = (flavor) => {
    if (flavorSelected) {
      setLiquidHeight(0);
      setPendingFlavor(flavor);
    } else {
      applyFlavor(flavor);
    }
  };

  const applyFlavor = (flavor) => {
    setFlavorSelected(true);
    if (drinkType === 'milk') {
      setLiquidColor(
        {
          'Classic Milk Tea': 'rgba(210, 180, 140, 0.8)',
          'Brown Sugar Milk Tea': 'rgba(139, 69, 19, 0.8)',
          'Matcha Milk Tea': 'rgba(152, 251, 152, 0.8)',
          'Taro Milk Tea':'rgba(221, 160, 221, 0.8)',
          'Thai Milk Tea':'rgba(255, 140, 0, 0.8)',
          'Honeydew Milk Tea':'rgba(240, 255, 240, 0.8)',
        }[flavor] || 'rgba(255, 192, 203, 0.6)'
      );
    } else if (drinkType === 'water') {
      setLiquidColor(
        {'Strawberry Fruit Tea':'rgba(255, 99, 132, 0.4)',
          'Passionfruit Tea':'rgba(255, 165, 0, 0.4)',
          'Mango Fruit Tea':'rgba(255, 204, 92, 0.4)',
        }[flavor] || 'rgba(255, 192, 203, 0.4)');
    }
    setPendingFlavor(null);
  };

  const getFlavorColor = (flavor) => {
    const flavorColors = {
      yogurt: '#F4F1E1', // Yogurt
      mango: '#FFB200', // Mango
      blueberry: '#4F86F7', // Blueberry
      strawberry: '#FF477E', // Strawberry
      peach: '#FFB7B2', // Peach
      passionfruit: '#FF6347', // Passionfruit
    };
    return flavorColors[flavor] || 'rgba(255, 0, 0, 0.6)'; // Default to red if flavor is not found
  };
  

  const handleFillCup = () => {
    const maxHeight = { small: 120, medium: 150, large: 180 }[size] || 0;
    if (pendingFlavor) {
      applyFlavor(pendingFlavor);
    }
    setLiquidHeight(maxHeight);
  };

  const handleToppingChange = (selectedTopping) => {
    setTopping(selectedTopping);
    setShowAddToppingButton(true);
    if (selectedTopping === 'poppingBoba') {
      setShowPoppingBobaFlavors(true);
    } else {
      setShowPoppingBobaFlavors(false);
    }
  };

  const handlePoppingBobaFlavorSelect = (flavor) => {
    setPoppingBobaFlavor(flavor);
    setShowAddToppingButton(false);
    setShowPoppingBobaFlavors(false);
    handleAddTopping(`poppingBoba ${flavor.toLowerCase()}`); // Append flavor as a class
  };
  
  const handleAddTopping = (flavor = topping) => {
    const baseType = flavor.includes('poppingBoba') ? 'poppingBoba' : flavor; // Extract base type
    const newToppings = Array.from({ length: 10 }, (_, index) => ({
      type: baseType,
      flavor: baseType === 'poppingBoba' ? flavor.split(' ')[1] : null, // Assign flavor for popping boba
      id: Date.now() + index,
    }));
    setToppingsList(newToppings);
    setShowAddToppingButton(false);
  };
  
  

  const handleReset = () => {
    setSize('');
    setActiveSize('');
    setDrinkType('');
    setLiquidHeight(0);
    setLiquidColor('rgba(255, 192, 203, 0.6)');
    setFlavorSelected(false);
    setTopping('');
    setToppingsList([]);
    setShowAddToppingButton(false);
    setPendingFlavor(null);
    setIceAdded(false);
    setShowPoppingBobaFlavors(false);
    setPoppingBobaFlavor('');
    setStrawVisible(false);
  };

  const handleIceChange = (addIce) => {
    setIceAdded(addIce);
  };

  const handleFinish = () => {
    console.log('Finish button clicked'); // Debug log
    setStrawVisible(true);
    
  };

  return (
    <div className='background'>
      <div className="cup-selector">
        <div className="size-buttons">
          <button
            className={`small ${activeSize === 'small' ? 'active' : ''}`}
            onClick={() => handleSizeChange('small')}
          ></button>
          <button
            className={`medium ${activeSize === 'medium' ? 'active' : ''}`}
            onClick={() => handleSizeChange('medium')}
          ></button>
          <button
            className={`large ${activeSize === 'large' ? 'active' : ''}`}
            onClick={() => handleSizeChange('large')}
          ></button>
        </div>
        <div className="drink-type-buttons">
          <button onClick={() => handleDrinkTypeChange('milk')}>Milk-based</button>
          <button onClick={() => handleDrinkTypeChange('water')}>Water-based</button>
        </div>
        {drinkType && (
          <div className="flavor-buttons">
            {drinkType === 'milk' && (
              <div className="milk-options">
               
  <button onClick={() => handleFlavorChange('Classic Milk Tea')}>Classic Milk Tea</button>
  <button onClick={() => handleFlavorChange('Brown Sugar Milk Tea')}>Brown Sugar Milk Tea</button>
  <button onClick={() => handleFlavorChange('Matcha Milk Tea')}>Matcha Milk Tea</button>
  <button onClick={() => handleFlavorChange('Taro Milk Tea')}>Taro Milk Tea</button>
  <button onClick={() => handleFlavorChange('Thai Milk Tea')}>Thai Milk Tea</button>
  <button onClick={() => handleFlavorChange('Honeydew Milk Tea')}>Honeydew Milk Tea</button>
</div>

            )}
            {drinkType === 'water' && (
              <div className="water-options">
                
  <button onClick={() => handleFlavorChange('Strawberry Fruit Tea')}>Strawberry Fruit Tea</button>
  <button onClick={() => handleFlavorChange('Passionfruit Tea')}>Passionfruit Tea</button>
  <button onClick={() => handleFlavorChange('Mango Fruit Tea')}>Mango Fruit Tea</button>
</div>

            )}
          </div>
        )}
        <div className="topping-buttons">
          <button onClick={() => handleToppingChange('boba')}>Boba</button>
          <button onClick={() => handleToppingChange('poppingBoba')}>Popping Boba</button>
          <button onClick={() => handleToppingChange('fruitJelly')}>Fruit Jelly</button>
        </div>
        {showPoppingBobaFlavors && (
          <div className="popping-boba-flavors">
            <div className="popping-boba-button-row">
              {['Yogurt', 'Mango', 'Blueberry', 'Strawberry', 'Peach', 'Passion fruit'].map((flavor) => (
                <button 
                  key={flavor} 
                  onClick={() => handlePoppingBobaFlavorSelect(flavor)}
                  className="popping-boba-button"
                >
                  {flavor} Popping Boba
                </button>
              ))}
            </div>
          </div>
        )}
        {showAddToppingButton && !showPoppingBobaFlavors && (
          <button onClick={() => handleAddTopping()}>Add {topping}</button>
        )}
        <div className="ice-buttons">
          <button className="ice-button" onClick={() => handleIceChange(true)}>Ice</button>
          <button className="no-ice-button" onClick={() => handleIceChange(false)}>No Ice</button>
        </div>
      </div>
      <div className='right-side'>
        <button onClick={handleReset}>Reset</button>
        <div className="cup-animation">
          <div className={`cup ${size}`}>
            <motion.div
              className="liquid"
              style={{ backgroundColor: liquidColor }}
              animate={{ height: `${liquidHeight}px` }}
              transition={{ duration: 0 }}
            />
         {toppingsList.map((topping, index) => (
  <motion.div
    key={topping.id}
    className={`topping ${topping.type} ${topping.flavor || ''}`} // Include flavor class if present
    initial={{
      y: -100,
      x: Math.random() * 100 - 50,
      opacity: 1,
      rotate: Math.random() * 360,
    }}
    animate={{
      y: 0,
      x: Math.random() * 100 - 50,
      opacity: 1,
      rotate: 0,
      scale: Math.random() * 0.2 + 0.8,
      transition: {
        delay: index * 0.1,
        duration: 0.8 + Math.random() * 0.2,
        ease: 'easeOut',
      },
    }}
    style={{
      position: 'absolute',
      bottom: '10px',
      left: `calc(50% + ${Math.random() * 40 - 20}px)`,
      width: '15px',
      height: '15px',
      backgroundColor:
        topping.type === 'boba'
          ? 'rgba(0, 0, 0, 0.8)' // Black for boba
          : topping.type === 'poppingBoba'
          ? getFlavorColor(topping.flavor) // Function to determine color
          : topping.type === 'fruitJelly'
          ? 'rgba(157, 34, 48, 0.7)' // Jelly color
          : 'transparent',
      borderRadius: '50%',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)', // Adds depth
    }}
  />
))}


             {/* Ice Cubes Animation */}
             {iceAdded && Array.from({ length: 5 }).map((_, index) => (
  <motion.div
    key={`ice-${index}`}
    className="ice-cube"
    initial={{ y: -50, opacity: 0, rotate: 0 }}
    animate={{
      y: [70, 40 + Math.random() * 20, 60 + Math.random() * 10], // Random vertical settling
      opacity: 1,
      rotate: [-15 + Math.random() * 30, 10, 0], // Small random rotation effect
      x: [0, Math.random() * 40 - 20, 0], // Randomized horizontal position (more variation)
    }}
    transition={{
      delay: index * 0.2, // Staggered delay for each ice cube
      duration: 1.5, // Slower animation for gradual effect
      ease: "easeOut",
    }}
    style={{
      left: `${5 + (index * 20)}px`, // Increased horizontal spacing between ice cubes
      position: 'absolute',
    }}
  />
))}
{strawVisible && (
  <motion.div 
    className="straw" 
    initial={{ opacity: 0, top: '-100px', rotate: 0 }} // Start with no rotation
    animate={{ opacity: 1, top: '-50px', rotate: 10 }} // Apply a slight bend
    transition={{ duration: 0.5 }} // Animation duration
    style={{ 
      position: 'absolute', 
      left: '50%', 
      transform: 'translateX(-50%)', // Center horizontally
      height: '230px', // Height of the straw
      width: '10px', // Width of the straw
      backgroundColor: 'black', // Color of the straw
      zIndex: 2000, // Ensure it is on top
      transformOrigin: 'top center', // Ensure the rotation starts from the top center
    }} 
  />
)}

        </div>
      </div>
        {flavorSelected || pendingFlavor ? (
          <button onClick={handleFillCup}>Fill Cup</button>
        ) : (
          <button disabled>Please select a flavor</button>
        )}
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
};

export default TheForm;

