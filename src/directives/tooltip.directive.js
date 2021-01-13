import M from 'materialize-css/dist/js/materialize.min';
export default {
    //adds tooltips to html
    bind (el, {value}) {
        M.Tooltip.init(el, {html: value})
    },
    //removes tooltips from html
    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el);

        if (tooltip && tooltip.destroy) {
            tooltip.destroy();
        } 
    }
}