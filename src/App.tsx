import Header from './components/ui/layout/header/Header';
import ToggleMainMavButton from './components/ui/layout/header/toggleHeaderButton/ToggleHeaderButton';
import Page from './components/ui/layout/page/Page';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Page className="home-page" title="Home | Your site name">
        <ToggleMainMavButton />
      </Page>
    </>
  );
}

export default App;
