import './Board.css';
import React, { useState, useEffect } from 'react';

import TableMap from '../utils/TableMap';


export default function Board({ boardSize, pen, zoom }) {

    const [draw, setDraw] = useState(false);

    const cellStyle = {
        height: zoom + "px",
        minWidth: zoom + "px"
    }

    useEffect(() => {
        TableMap.createTableMap(boardSize);
    }, [boardSize]);

    const mouseDownHandler = (e) => {
        prepareToDraw(e, true);
    };

    const mouseUpHandler = (e) => {
        prepareToDraw(e, false);
        console.log(TableMap.getTableMap());
    };

    const mouseEnterHandler = (e) => {
        if (draw) {
            colour(e.target.id);
        }
    };

    const prepareToDraw = (e, drawFlag) => {
        colour(e.target.id);
        setDraw(drawFlag);
    };

    const colour = (id) => {
        if (id) {
            let el = document.getElementById(id);
            if (el) {
                el.className = pen;
                console.log(id, pen);
                TableMap.setTableMapPosition(id, pen);
            }
        }
    };

    const renderRow = (row, cols) => {
        return (
            <div id={row} key={row}>
                <div id='row-header' style={cellStyle}>{row < 10 ? '0' + row : row}</div>
                {cols.map(col => (
                    <div className='' key={`${col}${row}`} id={`${col}${row}`} style={cellStyle}
                        onMouseEnter={mouseEnterHandler}>
                    </div>
                ))}
            </div>
        );
    };

    const renderGrid = () => {
        let cols = Array.from(Array(+boardSize.width).keys()),
            rows = Array.from(Array(+boardSize.height).keys()),
            elements = rows.map(row => renderRow(row, cols));
        return (
            elements
        );
    };

    const renderHeader = () => {
        let cols = Array.from(Array(+boardSize.width).keys());
        return (
            <div id='col-header'>
                <div className='header-empty' key={`header-empty`} style={cellStyle}></div>
                {cols.map(col => (
                    <div className='col-header' key={`header${col}`} style={cellStyle}>
                        {col < 10 ? '0' + col : col}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {boardSize.width !== 0 ? <p>selected pen: {pen}</p> : <p>please set borad size</p>}

            <div className="baordTableContainer"
                onMouseUp={mouseUpHandler}
                onMouseDown={mouseDownHandler}>
                {renderHeader()}
                {renderGrid()}
            </div>
        </>
    )
}