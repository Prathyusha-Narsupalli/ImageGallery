import axios from 'axios'


export function getImageList(url) {
    return axios.get(url);
}

export function getRandomImage(url) {
    return axios.get(url);
}

export function DownloadImage(config) {
    return axios(config);
}

export function getImageById(id) {
    return axios.get('https://picsum.photos/id/' + id + '/info');
}
