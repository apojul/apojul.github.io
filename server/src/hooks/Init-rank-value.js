module.exports = (options = {}) => {
    return async context => {
        const { result, app } = context
        app.service(options).patch(result.id, { rank: result.id})
        return context
    }
}