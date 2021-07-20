


export const sample_div_list = (num=5) => {

    const arr = [...Array(num).keys()];

    const data = arr.map((thing, key) => {
        return(
            <div key={key} className='mb12 border round h60'>{thing}</div>
        );
    });

    return(data);
}
