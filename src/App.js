import './App.css';
import { useQuery, gql } from '@apollo/client';
import { AnimeList } from './components/AnimeList';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const GET_ANIMES = gql`
  query GetAnimes {
    Page(page: ${page}, perPage: 20) {
      pageInfo{
        total
      }
      media {
        id
        idMal
        type
        title {
          english,
          native
        }
      }
    }
  }
`;
  const { loading, error, data } = useQuery(GET_ANIMES);

  if (error) {
    console.dir(error);
    return 'Error';
  }

  console.dir(data);

  return (
    <div className="App">
      <AnimeList list={loading ? [] : data.Page.media} isLoading={loading}/>
      <Pagination page={page} total={loading ? 0 : data.Page.pageInfo.total} onPaginationChange={(moveTo) => {
        setPage(page + moveTo);
      }}/>
    </div>
  );
}

export default App;
