import hl from 'highlight.js'

export function highlight()
{
    var client = new XMLHttpRequest()
    client.open('GET', 'code.js')
    client.onreadystatechange = function()
    {
        var code = document.getElementById('code')
        code.textContent = client.responseText
        hl.highlightElement(code)
    }
    client.send()
}