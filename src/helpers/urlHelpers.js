export const urlHelper = {
    getUrlParameter
};

function getUrlParameter(name, search) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
