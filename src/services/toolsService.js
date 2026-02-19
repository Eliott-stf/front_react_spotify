export const totalDuration = (objectData) => {
    //on va calculer le nombre de secondes pour tout les titres
    const totalSeconds = objectData?.songs && objectData?.songs.map(function (titre) {
        return parseInt(titre.duration);
    }).reduce(function (a, b) {
        return a + b
    }, 0)

    //formater en heure sec min
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secondes = Math.floor(totalSeconds % 60);

    //on retourne la string formaté sous la forme 1h 15min 30s
    return hours > 0
        ? `${hours}h ${minutes}min ${secondes}s`
        : `${minutes}min ${secondes}s`

}