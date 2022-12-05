export function Pagination (props) {

    return <div className="pagination-area">
        <button disabled={props.page === 1} type="button" onClick={() => {props.onPaginationChange(-1)}}>Prev</button>
        <span>{props.page || 'N/A'}</span>
        of
        <span>{props.total || 'N/A'}</span>
        <button type="button" disabled={props.page === props.total} onClick={() => {props.onPaginationChange(1)}}>Next</button>
    </div>
}
