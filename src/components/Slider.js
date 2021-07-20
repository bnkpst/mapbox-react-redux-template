
import {useEffect, useState} from "react";

export const Slider = (props) => {

    const [num, setNum] = useState(props.default_num);

    const {scale} = props;



    const handleChange = (e) => {

        if(scale) {
            setNum(parseInt(e.target.value) / 10);
        }
        else {
            setNum(parseInt(e.target.value));
        }

    }

    const handleChangeEnd = (e) => {

        if(scale) {
            props.cb(parseInt(e.target.value) / 10);
        }

        else {
            props.cb(parseInt(e.target.value));
        }

    }

    useEffect(() => {
        console.log('Wha?', num);
    }, [num])

    return(
        <div >
            <div className=''>{props.name}</div>
            <div className='px12 border border--blue round flex flex--space-between-main'>
                <div className='range range--s'>
                    <input
                        type='range'
                        defaultValue={props.default_num}
                        min={props.min}
                        max={props.max}
                        onChange={handleChange}
                        onMouseUp={handleChangeEnd}
                        onTouchEnd={handleChangeEnd}/>
                </div>
                <div className='py3 ml6'>
                    {num}
                </div>
            </div>
        </div>
    )
}

Slider.defaultProps = {
    name: 'Slider',
    min: 0,
    max: 5,
    default_num: 5,
    scale: false,
    cb: (e) => {console.log('No callback supplied. Slider value is: ', e)}
}
