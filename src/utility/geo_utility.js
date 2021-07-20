
export const randomLonLat = (lat=[-38, -27], lon=[150, 140]) => {

    let latitude = lat[0] + Math.random() * (lat[1] - lat[0]);
    let longitude = lon[0] + Math.random() * (lon[1] - lon[0]);

    return [longitude, latitude];
}

export const makePoints = (num=5) => {

    const points = [];

    for(let i = 0; i < num; i++) {
        points.push(randomLonLat());
    }
    return(points);
}