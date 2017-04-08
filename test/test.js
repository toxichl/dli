var vue = 123

var str = 'Unsupported template s%, The supported templates s% are as follows:'

var vars = [111, 222]

var res = str.split('s%')

res.forEach(function (re, index) {
    console.log(re)
    console.log(vars[index])
})


