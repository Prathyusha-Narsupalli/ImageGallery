import { getImageList, DownloadImage, getImageById } from '../services/ApiCalls'

export default {

    async getImages(context, url) {

        await getImageList(url).then(response => {
            context.commit('getImages', response)
        }).catch(err => {
            console.log("prathyusha loves rahul")
            throw err // this means it throws a normal error in js but due to async this error is coverted into promise
            //u can also use this   "return Promise.reject(err)"   instead of above throw err
        })
    },
    async DownloadImage(context, image) {
        await DownloadImage({
            url: image.download_url,
            method: 'GET',
            responseType: 'blob'
        }).then((response) => {

            var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
            var link = document.createElement('a')
            link.href = fileUrl
            link.setAttribute('download', image.author + '.jpg')
            document.body.appendChild(link)
            link.click()
        }).catch(err => {
            throw err
        })

    },
     async getImageById(context, id) {

        await getImageById(id).then(response => {
            context.commit('getImageById', response.data)

        }).catch(err => {
            throw err
        })
    }

}