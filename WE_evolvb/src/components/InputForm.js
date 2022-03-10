import { useState } from "react";
import './InputForm.css';

export default function InputForm({ submitInputForm }) {

    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);

    const submitForm = (e) => {
        e.preventDefault();
        submitInputForm({ width, height });
    };

    const handleWidthChange = (e) => {
        setWidth(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    return (
        <div className="data-input">
            <form onSubmit={submitForm}>
                <label htmlFor="width">Width:</label>
                <input id="width" type="number" min="3" max="100" value={width} onChange={handleWidthChange} />
                <label htmlFor="height">Height:</label>
                <input id="height" type="number" min="3" max="100" value={height} onChange={handleHeightChange} />
                <input className="submit" type="submit" />
            </form>
        </div>
    );
}