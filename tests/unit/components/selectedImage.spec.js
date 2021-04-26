import { shallowMount,createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import SelectedImage from './../../../src/components/SelectedImage.vue'


describe('In SelectedImage Component',()=>{
let actions,mutations,getters
let store,wrapper

beforeEach(()=>{
    const localVue=createLocalVue()
    localVue.use(Vuex)
    actions={
        DownloadImage:jest.fn(),
        getImageById:jest.fn((url) => Promise.resolve("true"))
     },
    getters={
        getImageById:()=>{
           return   {
              id: "0",
              author: "Alejandro Escamilla",
              width: 5616,
              height: 3744,
              url: "https://unsplash.com/photos/yC-Yzbqy7PY",
              download_url:"https://picsum.photos/id/0/5616/3744"
          }
       },
    }
      
   
 store=new Vuex.Store({
        actions,
        getters,
        mutations
    })
    wrapper=shallowMount(SelectedImage,{store,localVue,propsData:{id:1}})
    wrapper.vm.author=jest.fn()
})

it("Test to check whether it is a vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  })

it('Tests the Download Image functionality',async ()=>{
    await wrapper.setData({loading: false})
   await wrapper.find('button').trigger('click')
   expect(actions.DownloadImage).toHaveBeenCalled()
})

it('renders Loading link',async ()=>{
    await wrapper.setData({loading: true,error:null})
    expect(wrapper.find('.sr-only').text()).toEqual("Loading...")
})


it('renders Error link',async ()=>{
    await wrapper.setData({error:new Error('whoops error')})
    expect(wrapper.find('h1').text()).toEqual("whoops error")
})


  it("Test to the mounted dispatch",()=>{
      expect(actions.getImageById).toHaveBeenCalled()
  })

  it("Tests window.location.href in Selected Image component",async ()=>{
    await wrapper.setData({loading: false})
   await wrapper.find('#test-author').trigger('click')
   expect(wrapper.vm.author).toHaveBeenCalledWith("https://unsplash.com/photos/yC-Yzbqy7PY")
   })

   it("Tests watcher is working properly or not",async ()=>{
      // console.log(wrapper.vm.$data.loading)
    wrapper.vm.$options.watch.image.call(wrapper.vm)
     expect(wrapper.vm.$data.loading).not.toBeTruthy()
   })

})
