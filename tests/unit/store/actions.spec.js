import actions from '../../../src/store/actions'
import {DownloadImage,getImageById,getImageList} from '../../../src/services/ApiCalls'


jest.mock('../../../src/services/ApiCalls');

describe("In actions ",()=>{
    let commit,context

    beforeEach(()=>{
        commit=jest.fn()
    })

    it(" test the getImages actions method",async ()=>{
        const images= [{
            id: "0",
            author: "Alejandro Escamilla",
            width: 5616,
            height: 3744,
            url: "https://unsplash.com/photos/yC-Yzbqy7PY",
            download_url:"https://picsum.photos/id/0/5616/3744"
        },
        {
            id: "1",
            author: "Alejandro Escamilla",
            width: 5616,
            height: 3744,
            url: "https://unsplash.com/photos/yC-Yzbqy7PY",
            download_url:"https://picsum.photos/id/1/5616/3744"
        }];
        getImageList.mockResolvedValue(images);
        await actions.getImages({commit},"pageUrl"); // {commit} means we are passing and object with commit:commit it is not destructering
        expect(commit).toHaveBeenCalledWith("getImages",images);
    })

    it(" test the getImageById actions method",async ()=>{
        const image= {
            data:{
            id: "2",
            author: "Alejandro Escamilla",
            width: 5616,
            height: 3744,
            url: "https://unsplash.com/photos/yC-Yzbqy7PY",
            download_url:"https://picsum.photos/id/0/5616/3744"
            }
        }
        
        getImageById.mockResolvedValue(image)
        await actions.getImageById({commit},image.id)
        expect(commit).toHaveBeenCalledWith("getImageById",image.data)
    })

    it(" test the Download actions method",async ()=>{

        const image={
            author: "Alejandro Escamilla",
            url:"https://picsum.photos/id/1/5616/3744"
        }
        window.URL.createObjectURL=jest.fn(()=>image.url)
        DownloadImage.mockResolvedValue(image)

        await actions.DownloadImage({commit},image)

        expect(document.body.innerHTML).toBe("<a href=\"https://picsum.photos/id/1/5616/3744\" download=\"Alejandro Escamilla.jpg\" id=\"download\"></a>")
        
        //console.log(document.body.innerHTML)
        //console.log(document.getElementById("download").clicked)
        //expect(document.getElementById('a').clicked).toBeTruthy()
        
    })

})