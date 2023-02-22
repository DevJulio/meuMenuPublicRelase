export const formatData = () => {
    const parseDate = new Date();
    const day = parseDate.getDay();
    let fortmatedDay = ""
    switch (day) {
        case 0:
            fortmatedDay = 'Domingo';
            break;
        case 1:
            fortmatedDay = 'Segunda-feira';
            break;
        case 2:
            fortmatedDay = 'Terça-feira';
            break;
        case 3:
            fortmatedDay = 'Quarta-feira';
            break;
        case 4:
            fortmatedDay = 'Quinta-feira';
            break;
        case 5:
            fortmatedDay = 'Sexta-feira';
            break;
        case 6:
            fortmatedDay = 'Sábado';
            break;
        default:
            fortmatedDay = 'Dia inválido';
    }
    return fortmatedDay
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    formatData
}