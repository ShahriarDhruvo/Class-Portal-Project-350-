import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Palette } from "@material-ui/icons";

const ToggleTheme = () => {
  const { toggleTheme } = useContext(ThemeContext);

  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const custom_text = isLightTheme ? theme.light.custom_text : theme.dark.custom_text;
  
  return (
    <div
        onClick={toggleTheme}
        className={custom_text}
    >
        <Palette />        
    </div>
  );
};

export default ToggleTheme;
