function isContain(array, item) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (new RegExp(array[i] + '(#1.0)?').test(item)) return true
    }
    return false
}

module.exports = {
    isContain
}