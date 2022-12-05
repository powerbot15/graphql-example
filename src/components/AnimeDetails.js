import { useQuery, gql } from '@apollo/client';

export function AnimeDetails(props) {
    const GET_ANIMES = gql`
      query GetAnime {
        Media (id: ${props.animeId}) {
          id,
          coverImage {
            extraLarge
            large
            medium
            color
          },
          bannerImage,
          title {
            romaji
            english
            native
            userPreferred
          },
          description
        }
      }
    `;
    const {loading, error, data} = useQuery(GET_ANIMES);
    if (loading) return 'Loading...';
    if (error) return 'Error!';
    const details = (data && data.Media) || {};
    return <div className="anime-details">
        <div className="anime-details__image">
            <img src={details.coverImage.large} alt=""/>
        </div>
        <div className="anime-details__description">
            <h2>{details.title.english || details.title.native}</h2>
            <p>{details.description}</p>
        </div>
    </div>
}
