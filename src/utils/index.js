export const getRandomColor = () => {
    const randomHexNumber = Math.floor(Math.random()*16777215).toString(16);
    const randomColor = "#" + randomHexNumber;
    return randomColor;
}

export const orderDateValue = (date) => {
    if(date){
        const [year, month, day] = date.split('-');
        const convertedDate = `${day}/${month}/${year}`;
        return convertedDate;
    }
    return null;
}