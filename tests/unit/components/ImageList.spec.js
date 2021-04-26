import { shallowMount,createLocalVue, RouterLinkStub} from '@vue/test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import ImageList from './../../../src/components/ImageList.vue'
import {routes} from './../../../src/router/index'
import VueRouter from 'vue-router'


//Vue.config.ignoredElements = ["b-button","b-img","b-container","b-form-input"];
describe("Test for ImageList.vue component",()=>{
  
    let actions,getters,mutations
    let store,wrapper
    const router=new VueRouter({routes})
beforeEach(()=>{
    const localVue=createLocalVue()
 localVue.use(Vuex)
 localVue.use(VueRouter)
 localVue.use(BootstrapVue)
    mutations={
        nextPage:jest.fn(),
        previousPage:jest.fn(),
        ChangeLimit:jest.fn()
    }
    getters={
       pageNumber:()=>2,
       getUrl:()=>{ return 'https://picsum.photos/v2/list?page=1&limit=30'},
       getImages:()=>{
           return [{
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
        }]
       },
       getError:()=>{return null}
    }
    actions={
        getImages:jest.fn(),

    }
   
    store=new Vuex.Store({
        actions,
        mutations,
        getters
    })

    wrapper=shallowMount(ImageList,{store,localVue,router})
    wrapper.vm.scrollUp=jest.fn()
})

afterEach(()=>{
    wrapper.destroy()
})

it('Test to check correct number of images are rendered ',async ()=>{
    expect(actions.getImages).toHaveBeenCalled()
    expect(wrapper.findAll('router-link-stub')).toHaveLength(4)
})


it('Test for Next button in ImageList.vue component', async ()=>{
   await wrapper.find('#next').trigger('click')
   expect(mutations.nextPage).toHaveBeenCalled()
   expect(wrapper.vm.scrollUp).toHaveBeenCalled()  
})

it('Test for Previous button in ImageList.vue component',async ()=>{
   await wrapper.find('#prev').trigger('click')
   expect(mutations.previousPage).toHaveBeenCalled()
   expect(wrapper.vm.scrollUp).toHaveBeenCalled()      
})

it('Test for Limit text is rendered ',async ()=>{
   
    await wrapper.setData({limit:15})
    expect(mutations.ChangeLimit).not.toHaveBeenCalled()
    expect(wrapper.find('h5').text()).toBe('Limit: 15')
})

it('Test for Limit is rendered ',async ()=>{
   
    let input=wrapper.find('#limit')
    await input.setValue('66')
    expect(mutations.ChangeLimit).toHaveBeenCalled()
    expect(wrapper.find('h5').text()).toBe('Limit: 66')
})

it("Should have a div tag with class=page-buttons", () => {
    expect(wrapper.html()).toContain("page-buttons")
    
  })

  it("image-size function working properly or not",async ()=>{
   const url= wrapper.vm.imageSize({
        id: "0",
        width: 5616,
        height: 3744,
        download_url:"https://picsum.photos/id/0/5616/3744"
    },) 

    expect(url).toBe("https://picsum.photos/id/0/272")
})

it("watcher", () => {
    wrapper.vm.$store.dispatch=jest.fn(()=>Promise.resolve(true))
    wrapper.vm.$options.watch. getpageUrl.call(wrapper.vm)
    expect(wrapper.vm.$store.dispatch).toHaveBeenLastCalledWith("getImages",'https://picsum.photos/v2/list?page=1&limit=30')
    
  })

})