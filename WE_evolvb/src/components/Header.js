import { useState } from 'react';
import './Header.css';
import InputForm from './InputForm';
import Buttons from './Buttons';

export default function Header({ submitInputForm, penSelected, zoomChange, zoom, saveTable}) {

    const [inputMode, setInputMode] = useState(true);

    const submitInputFormFromHeader = ({ width, height }) => {
        setInputMode(!inputMode);
        submitInputForm({ width, height, clear: false });
    };

    const onNewTable = ({ width, height }) => {
        setInputMode(!inputMode);
        submitInputForm({ width, height, clear: true });
    };

    const onPenSelected = (value) => {
        penSelected(value);
    };

    const onZoomChange = (value) => {
        zoomChange(value);
    };

    const onSaveTable = () => {
        saveTable();
    };

    return (
        <div className="header">
            {inputMode ? <InputForm submitInputForm={submitInputFormFromHeader} />
                : <Buttons onNewTable={onNewTable} onPenSelected={onPenSelected} onZoomChange={onZoomChange} zoom={zoom} onSaveTable={onSaveTable}/>}
        </div>
    );
}