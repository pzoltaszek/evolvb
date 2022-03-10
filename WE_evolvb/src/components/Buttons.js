
export default function Buttons({ onNewTable, onPenSelected, onZoomChange, zoom, onSaveTable}) {

    const newTable = () => {
        onNewTable({ width: 0, height: 0 })
    };

    const penSelected = (e) => {
        onPenSelected(e.target.id);
    };

    const changeZoom = (e) => {
        onZoomChange(e.target.id);
    };

    const saveTable = () => {
        onSaveTable();
    };

    return (
        <>
            <button onClick={newTable}>New Table</button>
            <button>Save Table</button>
            <span>  |  </span>
            <button id='increase'onClick={changeZoom}>+</button>
            <button id='decrease'onClick={changeZoom}>-</button> 
            <span> zoom: {(zoom/10) -1} / 3</span>
            <span>  |  </span>
            <button onClick={saveTable}>SaveTable</button>
            <br></br>
            <button id='empty' onClick={penSelected}>reset</button>
            <button id='wall' onClick={penSelected}>red</button>
            <button id='blue' onClick={penSelected}>blue</button>
            <span>  |  </span>
            <button id='player' onClick={penSelected}>Player</button>
        </>
    );
}