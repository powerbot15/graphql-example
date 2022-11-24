export function AnimeList(props) {
    const list = props.list.map((animeData) => {
        const title = animeData.title.english || animeData.title.native
        return <li key={animeData.id}>
            {title}
        </li>
    });
    const content = props.isLoading ? 'Loading' : (<ul> {list} </ul>);
    return <div>
        {content}
    </div>;
}
