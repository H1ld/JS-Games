// Function to sort the list and record each step
function sortAndDisplayStep(listRandom) {
    let swapped;
    do {
        const STEPCOPY = {
            list: listRandom.slice(),
            items: []
        };
        stepHistory.push(STEPCOPY);

        swapped = false;
        for (let i = 0; i < listRandom.length - 1; i++) {
            if (listRandom[i] > listRandom[i + 1]) {
                const TMP = listRandom[i];
                listRandom[i] = listRandom[i + 1];
                listRandom[i + 1] = TMP;
                STEPCOPY.items = [i, i + 1];
                totalStep++;
                swapped = true;
                break;
            }
        }
    } while (swapped);

    return listRandom;
}
