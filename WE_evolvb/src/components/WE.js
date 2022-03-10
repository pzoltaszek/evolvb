import Board from './Board';
import Header from './Header';
import { useState } from 'react';
import TableMap from '../utils/TableMap';

export default function WE() {

    const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
    const [pen, setPen] = useState('');
    const [zoom, setZoom] = useState(20); //size of each cell in pixels
    const [player, setPlayer] = useState(false); //size of each cell in pixels

    const submitInputForm = ({ width, height, clear }) => {
        if (clear) {
            setBoardSize({ width: 0, height: 0 });
        }
        setBoardSize({ width, height });
    };

    const penSelected = (value) => {
        setPen(value);
        if (value === 'player') {
            setPlayer(true);
        }
    };

    const zoomChange = (value) => {
        if (value === 'increase') {
            zoom === 40 ? setZoom(40) : setZoom(zoom + 10);
        } else {
            zoom === 20 ? setZoom(20) : setZoom(zoom - 10);
        }
    };

    const convertMapIntoObject = (map) => {
        let returnObject = {};
        map.forEach((value, key) => {
            returnObject[key] = value.actual;
        });
        return returnObject;
    };

    const onSaveTable = () => {
        if (!player) {
            alert('Set position for player before save');
        } else {
            let table = convertMapIntoObject(TableMap.getTableMap());
            fetch('http://localhost:3001/we/writeFile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(table)
            });
        }
    };

    return (
        <>
            <Header submitInputForm={submitInputForm} penSelected={penSelected} zoomChange={zoomChange} zoom={zoom} saveTable={onSaveTable} />
            <Board boardSize={boardSize} pen={pen} zoom={zoom} />
        </>
    );
}