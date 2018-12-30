module.exports = (context, selectorKey) => {
    let selection = context;
    if(!selectorKey) return context;
    selectorKey.split('.').forEach(keyFragment => {
        selection = selection[keyFragment] ? selection[keyFragment] : selection;
    });
    return selection;
};