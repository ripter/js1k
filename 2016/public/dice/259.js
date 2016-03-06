// dice is a string in D&D style
// example: 2d6, 1d20, 4d2+7, 1d10-2
function rollDice(dice) {
    var reg = (/(\d*)d(\d+)([+-]?\d*)/)
        , match = reg.exec(dice)
        , count = parseInt(match[1], 10) || 1
        , max = parseInt(match[2], 10)
        , modifier = parseInt(match[3], 10) || 0
        , result = 0
        ;

    if (Number.isNaN(max)) {
        throw new Error('Number of sides on dice not specified. ' + dice);
    }

    while (count--) {
        result += 0 | ((Math.random() * max) + 1)
    }

    result += modifier;

    return result;
}
