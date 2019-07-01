import hl from 'highlight.js'

export function highlight()
{
    var client = new XMLHttpRequest()
    client.open('GET', 'code.js')
    client.onreadystatechange = function()
    {
        var code = document.getElementById('code')
        code.innerHTML = client.responseText
        hl.highlightBlock(code)
    }
    client.send()
}