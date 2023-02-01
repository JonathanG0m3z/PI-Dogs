import { useEffect } from 'react';
import { useState } from 'react';
import styles from './MiniInput.module.css';

export default function MiniInput({whatData, units, exchange, handleMiniInput}) {
    const [metricMeasure, setMetricMeasure] = useState({1: "", 2: ""});
    const [imperialMeasure, setImperialMeasure] = useState({1: "", 2: ""});

    const handleChange = (event)=>{
        const {id, value} = event.target;
        let oneOrTwo;
        if(id.includes('metric')){
            oneOrTwo = id[6];
            setMetricMeasure({...metricMeasure, [oneOrTwo]: value});
            setImperialMeasure({...imperialMeasure, [oneOrTwo]: (value*exchange).toFixed()});

        }else{
            oneOrTwo = id[8];
            setImperialMeasure({...imperialMeasure, [oneOrTwo]: value});
            setMetricMeasure({...metricMeasure, [oneOrTwo]: (value/exchange).toFixed()});
        }
    };

    useEffect(()=>{
        handleMiniInput(whatData, metricMeasure, imperialMeasure);
    },[metricMeasure, imperialMeasure])
    return(
        <>
            <label>{whatData}*</label>
                <div className={styles.divmini}>
                    <input value={metricMeasure[1]}  onChange={handleChange} className={styles.miniInput} type="number" id={`metric1`} />
                    <label className={styles.miniLabel}>-</label>
                    <input value={metricMeasure[2]} onChange={handleChange} className={styles.miniInput} type="number" id={`metric2`} />
                    <label className={styles.miniLabel}>{units[0]} or</label>

                    <input value={imperialMeasure[1]} onChange={handleChange} className={styles.miniInput} type="number" id={`imperial1`} />
                    <label className={styles.miniLabel}>-</label>
                    <input value={imperialMeasure[2]} onChange={handleChange} className={styles.miniInput} type="number" id={`imperial2`} />
                    <label className={styles.miniLabel}>{units[1]}</label>
                </div>
        </>
    )
}