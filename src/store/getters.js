export default {

    getImages(state) {
        return state.images
    },
    getUrl(state) {
        return state.pageUrl
    },
    pageNumber(state) {
        return state.pageNumber
    },
    getImageById(state) {
        return state.image
    },
    getError(state){
        return state.error
    }

}