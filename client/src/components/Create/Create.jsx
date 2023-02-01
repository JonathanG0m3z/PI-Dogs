import styles from './Create.module.css';
import Card from "../Card/Card";
import SelectTemp from '../SelectTemp/SelectTemp';
import MiniInput from '../MiniInput/MiniInput';
import Nav from "../Nav/Nav";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Alert from "../Alert/Alert";

export default function Create(props) {
    const initialData ={
        name: "",
        imperialHeight: "",
        metricHeight: "",
        imperialWeight: "",
        metricWeight: "",
        life_span: "",
        temperamentString: "",
        temperament: [],
        img: undefined
    };
    const [form, setForm] = useState(initialData);

    const [sendible, setSendible] = useState(false);
    const [showAlert, setShowAlert] = useState(false); 
    const [regex, setRegex] = useState(true);

    const handleChanges = (event)=>{
        const {id, value} = event.target;
        setForm({...form, [id]: value});
        if(id==='name') setRegex(validateRegex(value));
    };

    const handleMiniInput = (whatData, metricMeasure, imperialMeasure) =>{
        setForm({...form, 
            [`metric${whatData}`]: `${metricMeasure[1]} - ${metricMeasure[2]}`,
            [`imperial${whatData}`]: `${imperialMeasure[1]} - ${imperialMeasure[2]}`
        });
    };
    const addTemperament = (temperament, temperamentId)=>{
        const initial = form.temperamentString===""?"":`${form.temperamentString}, `;
        form.temperament.push(Number(temperamentId));
        setForm({...form,
            temperamentString: initial+temperament,
        });
    };
    const deleteTemps = ()=>setForm({...form, temperamentString:""});

    const sendForm = (event)=>{
        event.preventDefault();
        try {
            if(sendible){
            const post = axios({method: 'POST', 
            url: `http://localhost:3001/dogs`, 
            headers: { "Content-Type": "application/json; charset=UTF-8" }, 
            data: {...form, 
                life_span: `${form.life_span} years`,
            }});
            setShowAlert(true);
        }
        } catch (error) {
            console.log(error.message);
        }
        
    };
    const closeAlert = ()=>{
        setShowAlert(false);
        setForm(initialData);
    }

    function validateRegex(string) {
        return /^[A-Z][A-Za-z\u00C0-\u017F]+$/.test(string);
      }

    useEffect(()=>{
        if(form.name!=="" &&
            form.imperialHeight!==" - " &&
            form.metricHeight!==" - " &&
            form.imperialWeight!==" - " &&
            form.metricWeight!==" - " &&
            form.life_span!=="" &&
            form.temperamentString!=="" &&
            regex
        ) setSendible(true);
        else setSendible(false);
    },[form])
      
    return(
        <>
        <Nav />
            <div className={styles.container}>
                <div className={styles.divForm}>
                    <form action="">
                        <label for="name">Breed name*</label>
                        <input onChange={handleChanges} value={form['name']} className={styles.input} autoComplete='off' type="text" id="name" />
                        {!regex?<p className={styles.errorSpan}>The breed name must to begin with a capital letter and not contain numbers</p>:''}
                        <br />
                        <label htmlFor="">Image Url</label>
                        <input onChange={handleChanges} value={form.img} className={styles.input} autoComplete='off' type="text" id="img" />
                        <MiniInput whatData="Weight" units={['kg','lb']} 
                            exchange={2.20462} handleMiniInput={handleMiniInput}/>
                        <br />
                        <MiniInput whatData="Height" units={['cm','inch']} 
                            exchange={0.393701} handleMiniInput={handleMiniInput}/>
                        <br />
                        <label for="number">Life span*</label>
                        <div className={styles.divLife}>
                            <input onChange={handleChanges} value={form['life_span']} autoComplete='off' className={styles.input} type="number" id="life_span" />
                            <label htmlFor="">years</label>  
                        </div>
                        <label htmlFor="">Temperaments*</label>
                        <SelectTemp addTemperament={addTemperament} deleteTemps={deleteTemps} />
                        <br />
                        <input onClick={sendForm} disabled={!sendible} className={styles.input} type="submit" value="Create breed" />
                    </form>
                </div>
                <div className={styles.divCard}>
                <Card race={form?.name} 
                    img={form.img} 
                    metricWeight={form?.metricWeight}
                    imperialWeight={form?.imperialWeight}
                    temperaments={form?.temperamentString}
                />
                </div>
            </div>
            <Alert success={true} message={"¡New breed created successfully!"} 
                show={showAlert} closeAlert={closeAlert} />
        </>
        
    )
}
