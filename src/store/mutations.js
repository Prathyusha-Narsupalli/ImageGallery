export default {
    getImages(state, response) {

        state.paginationlink = response.headers.link

        state.images = response.data

    },
    ChangeLimit(state, limit) {
        state.pageUrl = state.pageUrl.slice(0, 43) + limit
    },
    nextPage(state) {
        var parse = require('parse-link-header')
        var parsed = parse(state.paginationlink)
        state.pageUrl = parsed.next.url
        state.pageNumber = parsed.next.page
    },
    previousPage(state) {
        var parse = require('parse-link-header')
        var parsed = parse(state.paginationlink)
        state.pageUrl = parsed.prev.url
        state.pageNumber = parsed.prev.page
    },
    getImageById(state, data) {
        state.image = data
    }
}