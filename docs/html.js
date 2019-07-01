export function html(options)
{
    options = options || {}
    const object = document.createElement(options.type || 'div')
    if (options.parent)
    {
        options.parent.appendChild(object)
    }
    if (options.styles)
    {
        for (let style in options.styles)
        {
            object.style[style] = options.styles[style]
        }
    }
    if (options.html)
    {
        object.innerHTML = options.html
    }
    return object
}