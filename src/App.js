import './App.css';
import { useQuery, gql } from '@apollo/client';
import { AnimeList } from './components/AnimeList';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
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
    <div>
      <h1 className="title">Fetch media by GraphQL queries</h1>
      <AnimeList page={page}/>
      <Pagination page={page} total={data.Page.pageInfo.lastPage} onPaginationChange={(moveTo) => {
        setPage(page + moveTo);
      }}/>
    </div>
  );
}

export default App;
