import getters from '../../../src/store/getters'

describe("In getters ",()=>{
    it("checks getImages method",()=>{
        const images=[ {
            
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
        const state={
            images:images,
        }
        expect(getters.getImages(state)).toBe(images)
    })
   
        it("checks getImage method",()=>{
            const image= {
                
                id: "0",
                author: "Alejandro Escamilla",
                width: 5616,
                height: 3744,
                url: "https://unsplash.com/photos/yC-Yzbqy7PY",
                download_url:"https://picsum.photos/id/0/5616/3744"
            }
            
            const state={
                image:image,
            }
            expect(getters.getImageById(state)).toBe(image)
        })

        it("checks getPageNumber method",()=>{
            const pageNumber=2;
            const state={
                pageNumber:pageNumber
            }
            expect(getters.pageNumber(state)).toBe(pageNumber)
        })

        it("checks getPageUrl method",()=>{
            const pageUrl='https://picsum.photos/v2/list?page=1&limit=30'
            const state={
               pageUrl:pageUrl,
            }
            expect(getters.getUrl(state)).toBe(pageUrl)
        })


    })