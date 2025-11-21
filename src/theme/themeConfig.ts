// src/theme/themeConfig.ts (Versão Final e Corrigida)

import type { ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    // Cores globais
    colorPrimary: '#FFD700', 
    colorBgBase: '#0D0D0D', 
    colorTextBase: '#FFFFFF', 
    
    // Configuração da Fonte Poppins
    fontFamily: 'Poppins, sans-serif',
    
    // Tipografia
    fontSize: 16,
  },
  // src/theme/themeConfig.ts

// ... (Restante do arquivo)

  components: {
    Button: {
        colorPrimary: '#FFD700',
        colorPrimaryHover: '#FACC15', 
        colorPrimaryActive: '#E0B800', 
        
        // Aplica o cinza escuro (#505050) no estado normal
        colorText: '#505050', 
        
     
        
        borderRadius: 8,
    },
    // ...
  }
// ...
};

export default themeConfig;