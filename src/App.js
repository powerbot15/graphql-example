import './App.css';
import { useQuery, gql } from '@apollo/client';
import { AnimeList } from './components/AnimeList';
import { AnimeDetails } from './components/AnimeDetails';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const [activeItemId, setActiveItemId] = useState(null);
  const GET_PAGES = gql`
  query GetPages {
    Page(page: 1, perPage: 20) {
      pageInfo{
        lastPage
      }
      media {
        id
        type
        title {
          english,
          native
        }
      }
    }
  }
`;
  const { loading, error, data } = useQuery(GET_PAGES);

  if (loading) {
      return <div className="loading-indicator">Loading...</div>;
  }

  if (error) {
    console.dir(error);
    return 'Error';
  }

  console.dir(data);

  return (
    <div className="app">
      <h1 className="title">Fetch media by GraphQL queries</h1>
      <div className="anime-wrapper">
          <AnimeList page={page} onItemSelect={(id)=>{
              setActiveItemId(id);
          }} activeItemId={activeItemId}/>
          {activeItemId ? <AnimeDetails animeId={activeItemId}/> : 'Select Anime to view details'}
      </div>
      <Pagination page={page} total={data.Page.pageInfo.lastPage} onPaginationChange={(moveTo) => {
        setPage(page + moveTo);
        setActiveItemId(null);
      }}/>
    </div>
  );
}

export default App;
