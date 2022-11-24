export function Pagination (props) {

    return <div>
        <button type="button" onClick={() => {props.onPaginationChange(-1)}}>Prev</button>
        <span>{props.page || 'N/A'}</span>
        of
        <span>{props.total || 'N/A'}</span>
        <button type="button" onClick={() => {props.onPaginationChange(1)}}>Next</button>
    </div>
}
