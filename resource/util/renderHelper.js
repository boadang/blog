
function renderWithDefaultValue(res, viewName, data = {}) {
    const defaultData = {
        showHeader: true,
        showFooter: true,
    }

    const combinedData = {...defaultData, ...data};
    res.render(viewName, combinedData);
}

module.exports = renderWithDefaultValue;