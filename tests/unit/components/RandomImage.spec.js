import { shallowMount} from '@vue/test-utils'

import RandomImage from './../../../src/components/RandomImage.vue'
import * as api from './../../../src/services/ApiCalls'


describe("In RandomImage Component",()=>{

    let wrapper;
    api.getRandomImage=jest.fn((url) => {
        return Promise.resolve({request:{
            responseURL:"https://i.picsum.photos/id/0/600/600.jpg?hmac=mf_gGheS6UFfHNQMNJQ3U9leplbe-E15BPZEFA2F6iE"
        }})
    })
    beforeEach(()=>{
        wrapper=shallowMount(RandomImage)
    })
    afterEach(()=>{
        wrapper.destroy()
    })

    it('is a Vue instance',()=>{
        expect(wrapper.isVueInstance).toBeTruthy()
    })

    it('Test to check a random image is rendered',()=>{
        expect(wrapper.find('img').exists()).toBeTruthy()
    })

    it('Test to check created life cycle hook has invoked correct method',async ()=>{
        
       expect(api.getRandomImage).toHaveBeenCalledWith("https://picsum.photos/600") 
    })

    it('renders Loading link',async ()=>{
        await wrapper.setData({loading: true,error:null})
        expect(wrapper.find('.sr-only').text()).toEqual("Loading...")
    })

    
    it('renders Error link',async ()=>{
        await wrapper.setData({error:new Error('whoops error')})
        expect(wrapper.find('h1').text()).toEqual("whoops error")
    })

})

describe("test to check error mssg is rendered",()=>{

    let wrapper;
    beforeEach(()=>{
        api.getRandomImage=jest.fn(()=>Promise.reject({message:"error"}))
        wrapper=shallowMount(RandomImage)
    });
    afterEach(()=>{
        wrapper.destroy()
    })
it("checking if catch block is working properly or not",async ()=>{
    expect(wrapper.html()).toContain("<h1>error</h1>")
 })

})

    
