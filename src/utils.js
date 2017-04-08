
function isContain(array, item) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (new RegExp( array[i] + '#?')=== item) return true
    }
    return false
}

module.exports = {
    isContain
}