import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as BrowserRouterAlias } from 'react-router-dom';
import { ChainId, ThirdwebProvider as CustomThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider as CustomStateContextProvider } from './context';
import CustomApp from './App';
import './1.css';

const customRoot = ReactDOM.createRoot(document.getElementById('root'));

customRoot.render(
  <CustomThirdwebProvider desiredChainId={ChainId.Goerli}> 
    <BrowserRouterAlias>
      <CustomStateContextProvider>
        <CustomApp />
      </CustomStateContextProvider>
    </BrowserRouterAlias>
  </CustomThirdwebProvider> 
);
