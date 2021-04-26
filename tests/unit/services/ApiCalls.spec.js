import {DownloadImage, getImageById,getImageList,getRandomImage} from '../../../src/services/ApiCalls'
import axios from 'axios'


jest.mock('axios')
describe("In gallery service file",()=>{

    it('tests getImageById method', async ()=>{
        axios.get=jest.fn()
    const mockedResponse= {
            
    id: "0",
    author: "Alejandro Escamilla",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/yC-Yzbqy7PY",
    download_url:"https://picsum.photos/id/0/5616/3744"
}
  axios.get.mockResolvedValue(mockedResponse);
  
  await getImageById(0).then((result)=>{
     expect(result).toBe(mockedResponse)
  })
 
 })


 it('tests getImages method', async ()=>{
        axios.get=jest.fn()
    const mockedResponse=[ {
            
    id: "0",
    author: "Alejandro Escamilla",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/yC-Yzbqy7PY",
    download_url:"https://picsum.photos/id/0/5616/3744"
}]
  axios.get.mockResolvedValue(mockedResponse);
  
  await getImageList('https://picsum.photos/v2/list?page=1&limit=30').then((result)=>{
     expect(result).toBe(mockedResponse)
  })
 
    })

    it('tests downloadImage method', async ()=>{
        axios.get=jest.fn();
    const mockedResponse={type:'blob'}
  axios.mockResolvedValue(mockedResponse)
  
  await DownloadImage({
    url:'https://picsum.photos/id/0/5616/3744',
    method:'GET',
    responseType:'blob'
  }).then((result)=>{
     expect(result).toBe(mockedResponse)
  })
 
    })


    it('tests getRandomImages method', async ()=>{
        axios.get=jest.fn()
    const mockedResponse="https://i.picsum.photos/id/767/600/600.jpg?hmac=usKapXoaypK2Vy6pgjf9JYaqRg_q770cytyeYP_X7dc"
  axios.get.mockResolvedValue(mockedResponse)
  
  await getRandomImage('https://picsum.photos/600').then((result)=>{
     expect(result).toBe(mockedResponse)
  })
 
    })




})