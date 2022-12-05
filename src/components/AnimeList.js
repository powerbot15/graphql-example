import { useQuery, gql } from '@apollo/client';
import {useEffect} from "react";

export function AnimeList(props) {
    const GET_ANIMES = gql`
      query GetAnimes {
        Page(page: ${props.page}, perPage: 20) {
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
    const {loading, error, data} = useQuery(GET_ANIMES);
    useEffect(() => {
       const list = (data && data.Page && data.Page.media) || [];
       if (list.length && props.activeItemId === null) {
           props.onItemSelect(list[0].id);
       }
    });
    if (error) {
        return 'Error';
    }

    const mediaList = data ? data.Page.media : [];
    const list = mediaList.map((animeData) => {
        const title = animeData.title.english || animeData.title.native
        return <li key={animeData.id} className="anime-list__item" onClick={()=>{
            props.onItemSelect(animeData.id)
        }}>
            {title}
        </li>
    });
    const loadingEl = <div className="loading-indicator loading-indicator_padding100">Loading...</div>
    const content = loading ? loadingEl : (<ul className="anime-list"> {list} </ul>);
    return <div className="anime-list-container">
        {content}
    </div>;
}
