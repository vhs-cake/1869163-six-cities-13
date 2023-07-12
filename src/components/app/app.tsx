import MainPage from '../../pages/main-page/main-page';

type AppPageProps = {
  cardsCount: number;
};

function App({ cardsCount }: AppPageProps): JSX.Element {
  return <MainPage cardsCount={cardsCount} />;
}

export default App;
